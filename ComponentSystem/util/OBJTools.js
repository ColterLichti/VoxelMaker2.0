import * as Three from '/node_modules/three/build/three.module.js';

export class OBJParser {

}

Object.defineProperties(OBJParser, {
    parseText: {
        value: (text, hardEdge) => {
            const geometry = new Three.BufferGeometry();

            const vertices = [];
            const normals = [];
            const uvs = [];
            const indices = [];

            // Split on newline regex
            const lines = text.split(/\r?\n/);

            // Fill arrays from file
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].toLowerCase();


                if (line !== undefined && line !== '') {
                    const prefix = line.substring(0, 2).trim();
                    const raw = line.split(' ');

                    switch (prefix) {
                        case 'o':
                            geometry.name = lines[i].substring(2).split('_')[0].trim();
                            break;

                        case 'v':
                            vertices.push(raw[1], raw[2], raw[3]);
                            break;

                        case 'vt':
                            uvs.push(raw[1], raw[2]);
                            break;

                        case 'vn':
                            normals.push(raw[1], raw[2], raw[3]);
                            break;

                        case 'f':
                            OBJParser._parseFace(line, indices);
                            break;
                    }
                }
            }

            // Transpose data to geometry
            OBJParser._transposeData(geometry, vertices, uvs, normals, indices);

            // Return the geometry
            return geometry;
        },
        writable: false,
        enumerable: false,
        configurable: false
    },
    _parseFace: {
        value: (line, indices) => {
            const groups = line.split(' ');
            // Index 0 will contain the 'f' label not any data
            for (let i = 1; i < groups.length; i++) {
                const group = groups[i].split('/');

                // Don't allow quad faces!
                if(group.length > 4)
                    throw 'This models faces have not been triangulated!';

                indices.push({ v: group[0] - 1, t: group[1] - 1, n: group[2] - 1 });
            }
        },
        writable: false,
        enumerable: false,
        configurable: false
    },
    _transposeData:{
        value:(geometry, vertices, uvs, normals, indices) =>{

            console.log(vertices);

            const t_uvs = [];
            const t_norms = [];
            const t_inds = [];

            geometry.setAttribute('position', new Three.BufferAttribute(new Float32Array(vertices), 3));

            for (let i = 0; i < indices.length; i++) {
                const index = indices[i];
                
                // Add the vertices index
                t_inds.push(index.v);
                // Align uv array with verts
                t_uvs[index.v] = uvs[index.t];
                // Align normals array with verts
                t_norms[index.v] = normals[index.n];                
            }

            geometry.setAttribute('normal', new Three.BufferAttribute(new Float32Array(t_norms), 3));
            geometry.setAttribute('uv', new Three.BufferAttribute(new Float32Array(t_uvs), 2));
        },
        writable: false,
        enumerable: false,
        configurable: false
    }
});

export class PureDataModel {
    constructor() {
        Object.defineProperties(this, {
            pureFaces: {
                value: [],
                writable: false,
                enumerable: false,
                configurable: false
            }
        });
    }
}

export class PureFace {
    constructor() {
        Object.defineProperties(this, {
            geometry: {
                value: new Three.BufferGeometry(),
                writable: true,
                enumerable: false,
                configurable: false
            },
            material: {
                value: new Three.MeshBasicMaterial(),
                writable: true,
                enumerable: false,
                configurable: false
            },
            sourceFileName: {
                value: '',
                writable: true,
                enumerable: false,
                configurable: false
            },
            clone: {
                value: ()=>{
                    const clone = new PureFace();

                    clone.geometry = this.geometry.clone();
                    clone.material = this.material.clone();
                    clone.sourceFileName = this.sourceFileName;

                    return clone;
                }
            }
        });

    }
}