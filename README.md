Terrain class using the [CDLOD](http://www.vertexasylum.com/downloads/cdlod/cdlod_latest.pdf) method of rendering heightmaps.

Installation
-------------
    $ npm install lod-terrain

Constructor
------------

    new LODTerrain(heightData, worldWidth, levels, resolution)
> LODTerrain is an extension of THREE.Object3D and thus can be added directly to the stage


> **Parameters**

> **heightData**:  *object*, THREE.DataTexture

> **worldWidth**:  *number*,  Default is 1024.

> **levels**:  *number*, Levels of detail. Default is 6.

> **resolution**:  *number*, Width and height segments. Default is 1.


Browser Bundle
---------------
   $ npm run build

Credits
--------

This project is based on [felixpalmer/lod-terrain](https://github.com/felixpalmer/lod-terrain).

## License

Copyright (c) 2014 Christopher Brandt

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
