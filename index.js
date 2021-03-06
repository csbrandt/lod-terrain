/*
The MIT License (MIT)

Copyright (c) 2014 Felix Palmer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/


var THREE = require('three');
var material = require('./material');
// Tiles that sit next to a tile of a greater scale need to have their edges morphed to avoid
// edges. Mark which edges need morphing using flags. These flags are then read by the vertex
// shader which performs the actual morph
var Edge = {
   NONE: 0,
   TOP: 1,
   LEFT: 2,
   BOTTOM: 4,
   RIGHT: 8
};

// Terrain is an extension of Object3D and thus can be added directly to the stage
function Terrain(heightData, worldWidth, levels, resolution)
{
   THREE.Object3D.call(this);

   this.worldWidth = (worldWidth !== undefined) ? worldWidth : 1024;
   this.levels = (levels !== undefined) ? levels : 6;
   this.resolution = (resolution !== undefined) ? resolution : 128;
   this.heightData = heightData;

   // Offset is used to re-center the terrain, this way we get the greates detail
   // nearest to the camera. In the future, should calculate required detail level per tile
   this.offset = new THREE.Vector3(0, 0, 0);

   // Create geometry that we'll use for each tile, just a standard plane
   this.tileGeometry = new THREE.PlaneGeometry(1, 1, this.resolution, this.resolution);
   // Place origin at bottom left corner, rather than center
   var m = new THREE.Matrix4();
   m.makeTranslation(0.5, 0.5, 0);
   this.tileGeometry.applyMatrix(m);

   // Create collection of tiles to fill required space
   /*jslint bitwise: true */
   var initialScale = this.worldWidth / Math.pow(2, levels);

   // Create center layer first
   //    +---+---+
   //    | O | O |
   //    +---+---+
   //    | O | O |
   //    +---+---+
   this.createTile(-initialScale, -initialScale, initialScale, Edge.NONE);
   this.createTile(-initialScale, 0, initialScale, Edge.NONE);
   this.createTile(0, 0, initialScale, Edge.NONE);
   this.createTile(0, -initialScale, initialScale, Edge.NONE);

   // Create "quadtree" of tiles, with smallest in center
   // Each added layer consists of the following tiles (marked 'A'), with the tiles
   // in the middle being created in previous layers
   // +---+---+---+---+
   // | A | A | A | A |
   // +---+---+---+---+
   // | A |   |   | A |
   // +---+---+---+---+
   // | A |   |   | A |
   // +---+---+---+---+
   // | A | A | A | A |
   // +---+---+---+---+
   for (var scale = initialScale; scale < worldWidth; scale *= 2)
   {
      this.createTile(-2 * scale, -2 * scale, scale, Edge.BOTTOM | Edge.LEFT);
      this.createTile(-2 * scale, -scale, scale, Edge.LEFT);
      this.createTile(-2 * scale, 0, scale, Edge.LEFT);
      this.createTile(-2 * scale, scale, scale, Edge.TOP | Edge.LEFT);

      this.createTile(-scale, -2 * scale, scale, Edge.BOTTOM);
      // 2 tiles 'missing' here are in previous layer
      this.createTile(-scale, scale, scale, Edge.TOP);

      this.createTile(0, -2 * scale, scale, Edge.BOTTOM);
      // 2 tiles 'missing' here are in previous layer
      this.createTile(0, scale, scale, Edge.TOP);

      this.createTile(scale, -2 * scale, scale, Edge.BOTTOM | Edge.RIGHT);
      this.createTile(scale, -scale, scale, Edge.RIGHT);
      this.createTile(scale, 0, scale, Edge.RIGHT);
      this.createTile(scale, scale, scale, Edge.TOP | Edge.RIGHT);
   }
   /*jslint bitwise: false */
}

Terrain.prototype = Object.create(THREE.Object3D.prototype);

Terrain.prototype.createTile = function(x, y, scale, edgeMorph)
{
   var terrainMaterial = material.createTerrainMaterial(this.heightData,
      this.offset,
      new THREE.Vector2(x, y),
      scale,
      this.resolution,
      edgeMorph);
   var plane = new THREE.Mesh(this.tileGeometry, terrainMaterial);
   this.add(plane);
};

module.exports = Terrain;
