import * as Three from '/node_modules/three/build/three.module.js';
import { Component } from '/ComponentSystem/ui/Component.js';

export class Viewer3D extends Component {
    // 🧪 Test
    cube;

    constructor() {
        super('viewer-three-dee');

        this.grow = 1;

        // Define constant members
        Object.defineProperties(this, {
            scene: {
                value: new Three.Scene(),
                writable: false
            },
            camera: {
                value: new Three.PerspectiveCamera(75, 16 / 9, 0.1, 1000),
                writable: false
            },
            renderer: {
                value: new Three.WebGLRenderer({ antialias: true, alpha: true }),
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
                    this.cube.rotation.y += 0.01;
                    this.cube.rotation.x += 0.01;
                    this.renderer.render(this.scene, this.camera);
                },
                writable: false,
                enumerable: false
            }
        });

        // Empty element and add canavas to component
        this._dom_element.innerHTML = '';
        this._dom_element.appendChild(this.renderer.domElement);

        // 🧪 For testing only 🧪
        const geometry = new Three.BoxGeometry();
        for (var i = 0; i < geometry.faces.length; i++) {
            var face = geometry.faces[i];
            for (var j = 0; j < 3; j++) {
                let color = new Three.Color(0xffffff);
                color.setHex(Math.random() * 0xffffff);
                face.vertexColors[j] = color;
            }
        }

        const material = new Three.MeshBasicMaterial({ color: 0xffffff, vertexColors: Three.VertexColors });
        this.cube = new Three.Mesh(geometry, material);
        this.scene.add(this.cube);
        this.camera.position.z = 1.5;

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