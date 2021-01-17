import { Mesh } from '/node_modules/three/build/three.module.js';
import { Values } from '/ComponentSystem/util/Values.js';

export class PureModel {
    constructor() {

        Object.defineProperties(this, {
            entries: {
                value: [],
                writable: false,
                enumerable: true,
                configurable: false
            },
            save: {
                value: () => {
                    window.localStorage.setItem(this.constructor.name, JSON.stringify(this));
                },
                writable: false,
                enumerable: false,
                configurable: false
            },
            load: {
                value: () => {
                    let obj = JSON.parse(window.localStorage.getItem(this.constructor.name));
                },
                writable: false,
                enumerable: false,
                configurable: false
            }
        });

    }
}

export class PureEntry {
    constructor() {
        Object.defineProperties(this, {
            _faces: {
                value: [],
                writable: false,
                enumerable: true,
                configurable: false
            },
            addFace: {
                value: (direction, face) => {
                    this._faces[Values.getDirectionIndex(direction)] = face;
                },
                writable: false,
                enumerable: false,
                configurable: false
            },
            removeFace: {
                value: (direction) => {
                    delete this._faces[Values.getDirectionIndex(direction)];
                },
                writable: false,
                enumerable: false,
                configurable: false
            },
            getFace: {
                value: (direction) => {
                    return this._faces[Values.getDirectionIndex(direction)];
                },
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
                    clone.sourceFileName = this.sourceFileName;
                    return clone;
                },
                writable: true,
                enumerable: false,
                configurable: false
            }
        });
    }
}