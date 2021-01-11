import { Controller } from '/ComponentSystem/controller/Controller.js';
import { FileManager } from '/ComponentSystem/util/FileManager.js';
import { BUILD_PureCreation_page } from '/ui-builds/PureCRUD-page.js';

export class PureController extends Controller {

    fileManager;

    constructor(application) {
        super(application);

        this.fileManager = new FileManager();
    }

    createView() {
        this.view = BUILD_PureCreation_page();
        this.application.UI.addPage('pure', this.view);
        let c = this.ctx;

        // 🔊👂 Set up subsciptions here 🔊👂
        c.voxelPageButton.subscribe('click', (event) => { this.NavigateToVoxelPage_handler(event) });
        c.partialPageButton.subscribe('click', (event) => { this.NavigateToPartialPage_handler(event) });

        c.North.subscribe('aux-click', (event) => { this.NorthAuxClick_handler(event) });
        c.North.subscribe('face-click', (event) => { this.NorthFaceClick_handler(event) });
    }

    NavigateToVoxelPage_handler(event) {
        this.application.UI.showPage('voxel');
    }

    NavigateToPartialPage_handler(event) {
        this.application.UI.showPage('partial');
    }

    NorthAuxClick_handler(event) {

    }
    async NorthFaceClick_handler(event) {
        let file;
        file = await this.fileManager.openFile();
        event.component.faceImage = '/images/check.png';
        event.component.toolTip = file.name;
    }
}