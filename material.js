var material = exports;
var THREE = require('three');
var fs = require('fs');
var terrainVert = fs.readFileSync(__dirname + '/shaders/terrain.vert', 'utf8');
var terrainFrag = fs.readFileSync(__dirname + '/shaders/terrain.frag', 'utf8');

var material = function(THREE, terrainVert, terrainFrag)
{
   return {
      createTerrainMaterial: function(heightData, globalOffset, offset, scale, resolution, edgeMorph)
      {
         // Is it bad to change this for every tile?
         terrainVert.define("TILE_RESOLUTION", resolution.toFixed(1));
         return new THREE.ShaderMaterial(
         {
            uniforms:
            {
               uEdgeMorph:
               {
                  type: "i",
                  value: edgeMorph
               },
               uGlobalOffset:
               {
                  type: "v3",
                  value: globalOffset
               },
               uHeightData:
               {
                  type: "t",
                  value: heightData
               },
               uTileOffset:
               {
                  type: "v2",
                  value: offset
               },
               uScale:
               {
                  type: "f",
                  value: scale
               }
            },
            vertexShader: terrainVert,
            fragmentShader: terrainFrag
         });
      }
   };
};
