import { Controller } from '/ComponentSystem/controller/Controller.js';
import { BUILD_VoxelCreation_page } from '/ui-builds/VoxelCRUD-page.js';

export class MasterVoxelController extends Controller {

    constructor(application) {
        super(application);
    }

    createView() {
        this.view = BUILD_VoxelCreation_page();
        this.application.UI.addPage('voxel', this.view);
        let c = this.ctx;

        // 🔊👂 Set up subsciptions here 🔊👂

        // ⚡ Annon func to stop the dumbest 'feature' of js. (this context change in handlers) ⚡
        // ⚡ The event object has a target already you fools!                                  ⚡
        c.purePageButton.subscribe('click', (event) => { this.NavigateToPurePage_handler(event) });
        c.partialPageButton.subscribe('click', (event) => { this.NavigateToPartialPage_handler(event) });

        c.pureRadio.subscribe('change', (event) => { this.TypeChanged_handler(event) });
        c.partialRadio.subscribe('change', (event) => { this.TypeChanged_handler(event) });
    }

    NavigateToPurePage_handler(event) {
        this.application.UI.showPage('pure');
        console.log('Navigating...');
    }

    NavigateToPartialPage_handler(event) {
        this.application.UI.showPage('partial');
        console.log('Navigating...');
    }

    TypeChanged_handler(event) {
        let typ = this.ctx.pureRadio.groupValue;

        if (typ === 'pure') {
            this.ctx.paVoxelRail.enabled = false;
        }
        else if (typ === 'partial') {
            this.ctx.paVoxelRail.enabled = true;
        }
    }
}