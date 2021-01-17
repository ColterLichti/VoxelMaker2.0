import { BufferGeometry, BufferAttribute, MeshBasicMaterial, Mesh, Vector3, Vector2, ObjectLoader } from '/node_modules/three/build/three.module.js';
import { OBJLoader } from '/node_modules/three/examples/jsm/loaders/OBJLoader.js';



export class OBJParser {

}

Object.defineProperties(OBJParser, {
    parseText: {
        value: (text) => {
            const loader = new OBJLoader();
            let mod = loader.parse(text);

            return mod.children[0];
        },
        writable: false,
        enumerable: true,
        configurable: false
    }
});



export class PureDataModel {
    constructor() {
        Object.defineProperties(this, {
            pureFaces: {
                value: [],
                writable: false,
                enumerable: true,
                configurable: false
            },
            toJSON: {
                value: () => {
                    let scope = this;
                    let obj = { 'type': scope.constructor.name, 'pureFaces': [] };

                    for (let key in this.pureFaces) {
                        const face = this.pureFaces[key];

                        obj.pureFaces.push({ 'key': key, 'value': face, 'type': face.constructor.name });
                    }

                    return obj;
                }
            }
        });
    }
}

export class PureFace {
    constructor() {
        Object.defineProperties(this, {
            mesh: {
                value: new Mesh(),
                writable: true,
                enumerable: true,
                configurable: false
            },
            sourceFileName: {
                value: '',
                writable: true,
                enumerable: true,
                configurable: false
            },
            clone: {
                value: () => {
                    const clone = new PureFace();
                    const mesh = new Mesh(this.mesh.geometry.clone(), this.mesh.material.clone());
                    clone.mesh = mesh;
                    return clone;
                },
                writable: true,
                enumerable: false,
                configurable: false
            }
        });
    }
}