import { Controller } from '/ComponentSystem/controller/Controller.js';
import { BUILD_PartialCreation_page } from '/ui-builds/PartialCRUD-page.js';

export class PartialController extends Controller {

    constructor(application) {
        super(application);
    }

    createView() {
        this.view = BUILD_PartialCreation_page();
        this.application.UI.addPage('partial', this.view);
        let c = this.ctx;

        // 🔊👂 Set up subsciptions here 🔊👂
        c.voxelPageButton.subscribe('click', (event) => { this.NavigateToVoxelPage_handler(event) });
        c.purePageButton.subscribe('click', (event) => { this.NavigateToPurePage_handler(event) });
    }

    NavigateToVoxelPage_handler(event) {
        this.application.UI.showPage('voxel');
    }

    NavigateToPurePage_handler(event) {
        this.application.UI.showPage('pure');
    }
}