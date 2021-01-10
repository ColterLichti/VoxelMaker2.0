import { ComponentApplication } from '/ComponentSystem/core/ComponentApplication.js';
import { MasterVoxelController } from '/controllers/MasterVoxelController.js';
import { Viewer3D } from '/ComponentSystem/ui/components/Viewer3D.js';

// Application
let application;

let voxelController;

// Initialization before full load
document.addEventListener('DOMContentLoaded', (event) => {
    application = new ComponentApplication();
    application.initializeApp();

    voxelController = new MasterVoxelController(application);
});

// Build views once page is fully loaded and ready to display
window.addEventListener('load', (event)=>{
    console.log('huh');
    voxelController.createView();
});