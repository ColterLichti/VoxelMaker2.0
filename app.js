import { ComponentApplication } from '/ComponentSystem/core/ComponentApplication.js';
import { MasterVoxelController } from '/controllers/MasterVoxelController.js';
import { PureController } from '/controllers/PureController.js';
import { PartialController } from '/controllers/PartialController.js';
import { Viewer3D } from '/ComponentSystem/ui/components/Viewer3D.js';

import { FileManager } from '/ComponentSystem/util/FileManager.js';

// Application
let application;

let voxelController;
let pureController;
let partialController;

// Initialization before full load
document.addEventListener('DOMContentLoaded', (event) => {
    application = new ComponentApplication();
    application.initializeApp();

    voxelController = new MasterVoxelController(application);
    pureController = new PureController(application);
    partialController = new PartialController(application);
});

// Build views once page is fully loaded and ready to display
window.addEventListener('load', (event) => {
    voxelController.createView();
    pureController.createView();
    partialController.createView();

    application.UI.showPage('voxel');
});