import { ComponentApplication } from '/ComponentSystem/core/ComponentApplication.js';
import { MasterVoxelController } from '/controllers/MasterVoxelController.js';

// Application
let application;


document.addEventListener('DOMContentLoaded', (event) => {
    application = new ComponentApplication();
    application.initializeApp();

    let voxelController = new MasterVoxelController(application);
    voxelController.createView();
});