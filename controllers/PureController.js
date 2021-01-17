import { MeshLambertMaterial } from '/node_modules/three/build/three.module.js';
import { Controller } from '/ComponentSystem/controller/Controller.js';
import { PureModel, PureEntry, PureFace } from '/models/Pure.js';
import { FileManager } from '/ComponentSystem/util/FileManager.js';
import { BUILD_PureCreation_page } from '/ui-builds/PureCRUD-page.js';
import { Values } from '/ComponentSystem/util/Values.js';

export class PureController extends Controller {

    fileManager;
    model;
    workingEntry;

    constructor(application) {
        super(application);

        this.fileManager = new FileManager();
        this.model = new PureModel();
        this.workingEntry = new PureEntry();
    }

    createView() {
        this.view = BUILD_PureCreation_page();
        this.application.UI.addPage('pure', this.view);
        let c = this.ctx;

        // 🔊👂 Set up subsciptions here 🔊👂
        c.voxelPageButton.subscribe('click', (event) => { this.NavigateToVoxelPage_handler(event) });
        c.partialPageButton.subscribe('click', (event) => { this.NavigateToPartialPage_handler(event) });

        // Subscribe all face buttons 🐵
        for (let key in c.faceButtons) {
            let btn = c.faceButtons[key];
            btn.subscribe('aux-click', (event) => { this.AuxClick_handler(event) });
            btn.subscribe('face-click', (event) => { this.FaceClick_handler(event) });
        }

        c.createButton.subscribe('click', (event) => { this.ActionCreate_handler(event) });
    }

    // Navigation events
    NavigateToVoxelPage_handler(event) {
        this.application.UI.showPage('voxel');
    }

    NavigateToPartialPage_handler(event) {
        this.application.UI.showPage('partial');
    }

    // Handles all face click events
    async FaceClick_handler(event) {
        let files;
        let chooseStatus;
        let c = this.ctx;

        // Let user select a file
        try {
            files = await this.fileManager.openFile();
            chooseStatus = true;
        } catch {
            // User closed dialog or cancelled
            chooseStatus = false;
        }
        let component = event.component;
        if (chooseStatus) {
            // File is okay

            // Update component
            component.selected = true;
            component.toolTip = files[0].name;

            // Load and parse selected file
            c.progressBar.progress = 0;
            let text = await FileManager.loadFile(files[0], (event) => { c.progressBar.progressCallback_handler(event) });
            c.progressBar.progress = 0;

            // Add geometry to data model
            let mesh = FileManager.parseOBJ(text);

            // Create and add material
            let mat = new MeshLambertMaterial({ color: 0xffffff * Math.random(), vertexColors: false });

            // Apply material
            mesh.material = mat;

            // Rotate face
            this.rotateMesh(mesh, component.direction);

            // Update model
            let face = new PureFace();
            face.sourceFileName = files[0].name;
            face.mesh = mesh;
            this.workingEntry.addFace(component.direction, face);

        } else {
            // File is not okay

            // Update component
            event.component.selected = false;
            event.component.toolTip = '';

            // Update model
            this.workingEntry.removeFace(component.direction);
        }

        // Make the view reflect the working entry
        this.renderModel();
    }

    AuxClick_handler(event) {
        let component = event.component;
        let face = this.workingEntry.getFace(component.direction);
        let c = this.ctx;

        if (face !== undefined) {
            for (let key in c.faceButtons) {
                // Duplicate selected face and apply to model
                if (key !== component.direction) {
                    let cloneFace = face.clone();
                    this.rotateMesh(cloneFace.mesh, key);
                    this.workingEntry.addFace(key, cloneFace);
                }

                // Update buttons
                c.faceButtons[key].selected = true;
                c.faceButtons[key].toolTip = face.sourceFileName;
            }
        }
        else {
            for (let key in this.ctx.faceButtons) {
                // Update model
                this.workingEntry.removeFace(key);

                // Update buttons
                c.faceButtons[key].selected = false;
                c.faceButtons[key].toolTip = '';
            }
        }

        // Make the view reflect the working entry
        this.renderModel();
    }

    ActionCreate_handler(event) {
        let c = this.ctx;

        let allSelected = true;

        for (let key in c.faceButtons) {
            let btn = c.faceButtons[key];
            if (!btn.selected)
                allSelected = false;
        }
        // Add the working entry to the model
        if (allSelected)
            this.newEntryFromWorking();
            else
            console.warn('Assign all faces before creating!');
    }

    rotateMesh(mesh, dir) {
        mesh.rotation.setFromVector3(Values.getRotationOffset(dir));
        let pos = Values.getPositionOffset(dir).multiplyScalar(0.5);
        mesh.position.set(pos.x, pos.y, pos.z);
        mesh.material.color.set(0xffffff * Math.random());
    }

    renderModel() {
        this.ctx.viewer.clearView();
        for (let i = 0; i < this.workingEntry._faces.length; i++) {
            const face = this.workingEntry._faces[i];

            if (face !== undefined) {
                this.ctx.viewer.addToView(face.mesh);
            }
        }
    }

    newEntryFromWorking() {
        this.model.entries.push(this.workingEntry);
        this.workingEntry = new PureEntry();
        this.renderModel();
        console.log(this.model);
    }
}
