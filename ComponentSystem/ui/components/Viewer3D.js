import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, MeshBasicMaterial, VertexColors, AmbientLight } from '/node_modules/three/build/three.module.js';
import { BoxGeometry, Color } from '/node_modules/three/build/three.module.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js'
import { Component } from '/ComponentSystem/ui/Component.js';
import { FacePickerControls } from '/ComponentSystem/ui/components/FacePickerControl.js';

export class Viewer3D extends Component {

    constructor() {
        super('viewer-three-dee');

        this.grow = 1;

        // Define constant members
        Object.defineProperties(this, {
            scene: {
                value: new Scene(),
                writable: false
            },
            camera: {
                value: new PerspectiveCamera(75, 16 / 9, 0.1, 1000),
                writable: false
            },
            renderer: {
                value: new WebGLRenderer({ antialias: true, alpha: true }),
                writable: false
            },
            _children: {
                value: [],
                writable: false
            },
            _light: {
                value: new AmbientLight( 0xffffff ),
                writable: false
            },
            'viewportResize': {
                value: (event) => {
                    this.renderer.setSize(0, 0);
                    this.camera.aspect = this.viewportWidth / this.viewportHeight;
                    this.camera.updateProjectionMatrix();
                    this.renderer.setSize(this.viewportWidth, this.viewportHeight);
                },
                writable: false,
                enumerable: false
            },
            'animationLoop': {
                value: () => {
                    // Keep animating
                    requestAnimationFrame(this.animationLoop);
                    // Resize viewport
                    this.viewportResize();
                    // Render function
                    this.render();
                },
                writable: false,
                enumerable: false
            },
            'render': {
                value: () => {
                    this.orbitControls.update();
                    this.renderer.render(this.scene, this.camera);
                },
                writable: false,
                enumerable: false
            },
            'addToView': {
                value: (mesh) => {
                    this.scene.add(mesh);
                    this._children.push(mesh);
                },
                writable: false,
                enumerable: false
            },
            'removeFromView': {
                value: (mesh) => {
                    this.scene.remove(mesh);
                },
                writable: false,
                enumerable: false
            },
            'clearView': {
                value: () => {
                    for (let i = 0; i < this._children.length; i++) {
                        const child = this._children[i];
                        
                        this.scene.remove(child);
                    }

                    this._children.length = 0;
                },
                writable: false,
                enumerable: false
            },
        });

        // Sperate define to ensure domElement is created first
        Object.defineProperty(this, 'orbitControls', {
            value: new OrbitControls(this.camera, this.renderer.domElement),
            writable: false
        });

        Object.defineProperty(this, 'picker', {
            value: new FacePickerControls(this.camera, this.scene, this.renderer.domElement),
            writable: false
        });

        // Empty element and add canavas to component
        this._dom_element.innerHTML = '';
        this._dom_element.appendChild(this.renderer.domElement);
        this.camera.position.z = 1.5;

        this.scene.add(this._light);

        // Start the animation loop
        this.animationLoop();
    }

    get viewportWidth() {
        return this.domElement.clientWidth;
    }

    get viewportHeight() {
        return this.domElement.clientHeight;
    }

    forceUpdate() {
        this.viewportResize();
    }
}