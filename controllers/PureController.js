import { Controller } from '/ComponentSystem/controller/Controller.js';
import { FileManager } from '/ComponentSystem/util/FileManager.js';
import { BUILD_PureCreation_page } from '/ui-builds/PureCRUD-page.js';

export class PureController extends Controller {

    fileManager;

    // Testing
    pureModel;

    constructor(application) {
        super(application);

        this.fileManager = new FileManager();
        this.pureModel = {faceFiles:[]};
    }

    createView() {
        this.view = BUILD_PureCreation_page();
        this.application.UI.addPage('pure', this.view);
        let c = this.ctx;

        // 🔊👂 Set up subsciptions here 🔊👂
        c.voxelPageButton.subscribe('click', (event) => { this.NavigateToVoxelPage_handler(event) });
        c.partialPageButton.subscribe('click', (event) => { this.NavigateToPartialPage_handler(event) });

        // Subscribe all face buttons 🐵
        for(let key in c.faceButtons){
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
        if(event.face){
            let files;
            let chooseStatus;
            try{
                files = await this.fileManager.openFile();
                chooseStatus = true;
            }catch{
                // User closed dialog or cancelled
                chooseStatus = false;
            }

            let comp = event.component;
            if(chooseStatus){
                comp.selected = true;
                comp.toolTip = files[0].name;

                this.pureModel.faceFiles[comp.direction] = files[0];
            }else{
                event.component.selected = false;
                event.component.toolTip = '';
                this.pureModel.faceFiles[comp.direction] = '';
            }
        }
        // Bulk assign this buttons value to all buttons
        // Also works for clearing values from all buttons
        else if (event.aux){
            let comp = event.component;

            let file = this.pureModel.faceFiles[comp.direction];

            if(file !== undefined && file instanceof File){
                for(let key in this.ctx.faceButtons){
                    // Update model
                    this.pureModel.faceFiles[key] = file;

                    // Update buttons
                    this.ctx.faceButtons[key].selected = true;
                    this.ctx.faceButtons[key].toolTip = file.name;
                }
            }
            else{
                for(let key in this.ctx.faceButtons){
                    // Update model
                    this.pureModel.faceFiles[key] = undefined;

                    // Update buttons
                    this.ctx.faceButtons[key].selected = false;
                    this.ctx.faceButtons[key].toolTip = '';
                }
            }
        }
    }
}