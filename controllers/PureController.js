import * as Three from '/node_modules/three/build/three.module.js';
import { Controller } from '/ComponentSystem/controller/Controller.js';
import { FileManager } from '/ComponentSystem/util/FileManager.js';
import { BUILD_PureCreation_page } from '/ui-builds/PureCRUD-page.js';

import { OBJParser, PureDataModel, PureFace } from '/ComponentSystem/util/OBJTools.js';

export class PureController extends Controller {

    fileManager;

    model;

    constructor(application) {
        super(application);

        this.fileManager = new FileManager();

        this.model = new PureDataModel();

        // Arrays are keyed by face direction
        this.pureModel = {
            // The selected file for the face
            faceFiles: [],
            // The data in the selected file
            faceRawData: []
        };
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
            btn.subscribe('aux-click', (event) => { this.FaceClick_handler(event) });
            btn.subscribe('face-click', (event) => { this.FaceClick_handler(event) });
        }
    }

    NavigateToVoxelPage_handler(event) {
        this.application.UI.showPage('voxel');
    }

    NavigateToPartialPage_handler(event) {
        this.application.UI.showPage('partial');
    }

    async FaceClick_handler(event) {
        if (event.face) {
            let files;
            let chooseStatus;
            // Let user select a file
            try {
                files = await this.fileManager.openFile();
                chooseStatus = true;
            } catch {
                // User closed dialog or cancelled
                chooseStatus = false;
            }

            // File is okay
            let comp = event.component;
            if (chooseStatus) {
                // Update comp
                comp.selected = true;
                comp.toolTip = files[0].name;

                // Update model
                if(this.model.pureFaces[comp.direction] === undefined)
                    this.model.pureFaces[comp.direction] = new PureFace();
                this.model.pureFaces[comp.direction].sourceFileName = files[0].name;

                // Load and parse selected file
                this.ctx.progressBar.progress = 0;
                let text = await FileManager.loadFile(files[0], (event) => { this.ctx.progressBar.progressCallback_handler(event) });  
                // Add geometry to data model
                this.model.pureFaces[comp.direction].geometry = OBJParser.parseText(text);
                this.ctx.progressBar.progress = 0;

                // Create and add material
                this.model.pureFaces[comp.direction].material = new Three.MeshBasicMaterial({ color: 0xffffff, vertexColors: true});

                // File is not okay
            } else {
                event.component.selected = false;
                event.component.toolTip = '';
                this.model.pureFaces[comp.direction] = undefined;
            }
        }
        // Bulk assign this buttons value to all buttons
        // Also works for clearing values from all buttons
        else if (event.aux) {
            let comp = event.component;
            
            if (this.model.pureFaces[comp.direction] !== undefined) {                
                for (let key in this.ctx.faceButtons) {
                    // Update model
                    this.model.pureFaces[key] = this.model.pureFaces[comp.direction].clone();

                    // Update buttons
                    this.ctx.faceButtons[key].selected = true;
                    this.ctx.faceButtons[key].toolTip = this.model.pureFaces[comp.direction].sourceFileName;
                }
            }
            else {
                for (let key in this.ctx.faceButtons) {
                    // Update model
                    this.model.pureFaces[key] = undefined;

                    // Update buttons
                    this.ctx.faceButtons[key].selected = false;
                    this.ctx.faceButtons[key].toolTip = '';
                }
            }
        }

        console.log(this.model);
    }
}