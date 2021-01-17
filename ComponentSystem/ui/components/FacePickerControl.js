import { TextureLoader, Raycaster, PlaneGeometry, MeshBasicMaterial, DoubleSide, Mesh} from '/node_modules/three/build/three.module.js';
import { Values } from '/ComponentSystem/util/Values.js';


export class FacePickerControls {

    constructor(camera, scene, domElement) {

        Object.defineProperty(this, '_textureLoader', {
            value: new TextureLoader(),
            writable: false,
            enumerable: false,
            configurable: false
        });

        Object.defineProperties(this, {
            _camera: {
                value: camera,
                writable: false,
                enumerable: false,
                configurable: false
            },
            _scene: {
                value: scene,
                writable: false,
                enumerable: false,
                configurable: false
            },
            _element: {
                value: domElement,
                writable: false,
                enumerable: false,
                configurable: false
            },
            _raycaster: {
                value: new Raycaster(),
                writable: false,
                enumerable: false,
                configurable: false
            },
            _faceTextures: {
                value: {
                    'north': this._textureLoader.load('/images/o_north.png'),
                    'east': this._textureLoader.load('/images/o_east.png'),
                    'south': this._textureLoader.load('/images/o_south.png'),
                    'west': this._textureLoader.load('/images/o_west.png'),
                    'up': this._textureLoader.load('/images/o_up.png'),
                    'down': this._textureLoader.load('/images/o_down.png')
                },
                writable: false,
                enumerable: false,
                configurable: false
            },
            _model: {
                value: {
                    'north': new FacePickModel('north'),
                    'east': new FacePickModel('east'),
                    'south': new FacePickModel('south'),
                    'west': new FacePickModel('west'),
                    'up': new FacePickModel('up'),
                    'down': new FacePickModel('down')
                },
                writable: false,
                enumerable: false,
                configurable: false
            },
            faceToggle: {
                value: (face, value) => {
                    if (value !== undefined) {
                        this._model[face].toggleStatus = value;
                    }
                    else {
                        return this._model[face].toggleStatus;
                    }
                },
                writable: false,
                enumerable: false,
                configurable: false
            },
            faceSelect: {
                value: (face, value) => {
                    if (value !== undefined) {
                        this._model[face].selectStatus = value;
                    }
                    else {
                        return this._model[face].selectStatus;
                    }
                },
                writable: false,
                enumerable: false,
                configurable: false
            },
            update: {
                value: () => {

                },
                writable: false,
                enumerable: false,
                configurable: false
            },
            _generateMeshes: {
                value: () => {
                    for (let key in this._model) {
                        const face = this._model[key];

                        // Plane geometry and material
                        const geometry = new PlaneGeometry(0.5, 0.5, 1, 1);
                        const material = new MeshBasicMaterial({
                            color: 0xffffff,
                            opacity: 0.5,
                            transparent: true,
                            vertexColors: true,
                            side: DoubleSide,
                            map: this._faceTextures[key]
                        });

                        face.mesh = new Mesh(geometry, material);
                        // Rotate this face
                        face.mesh.rotation.setFromVector3(Values.getRotationOffset(key));
                        // Position this face just beyond the borders of a voxel
                        let pos = Values.getPositionOffset(key).multiplyScalar(0.52);
                        face.mesh.position.set(pos.x, pos.y, pos.z);

                        // Add mesh to scene
                        this._scene.add(face.mesh);
                    }
                },
                writable: false,
                enumerable: false,
                configurable: false
            }
        });

        this._generateMeshes();

    }

}

class FacePickModel {
    constructor(direction) {
        Object.defineProperties(this, {
            toggleStatus: {
                value: false,
                writable: true,
                enumerable: false,
                configurable: false
            },
            selectStatus: {
                value: false,
                writable: true,
                enumerable: false,
                configurable: false
            },
            direction: {
                value: direction,
                writable: false,
                enumerable: false,
                configurable: false
            },
            mesh: {
                value: undefined,
                writable: true,
                enumerable: false,
                configurable: false
            }
        });
    }
}
