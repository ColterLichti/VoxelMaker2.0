import * as Comps from '/ComponentSystem/ui/components/ComponentLibrary.js';
import { Viewer3D } from '/ComponentSystem/ui/components/Viewer3D.js';

// Build main page and assign it's variables
// Card groups and more complex sub UI are built by sub functions
export function BUILD_VoxelCreation_page() {
    // Define context for page
    let ctx = {};


    // ⬇️ INSTANTIATE COMPONENTS / SET VALUES ⬇️
    // The page
    let page = new Comps.AppPage();

    // The progress bar at page top
    ctx.progressBar = new Comps.ProgressBar();

    // Page split (horizontal)
    let splitPane = new Comps.HorizontalRail();
    splitPane.grow = 1;

    // Left split (vertical)
    let leftPane = new Comps.VerticalRail();
    leftPane.width = '15%';
    leftPane.minWidth = '275px';

    // Right split (vertical)
    let rightPane = new Comps.VerticalRail();
    rightPane.grow = 1;

    // Navigation card
    let navigationCard = BUILD_Navigation_card(ctx);

    // Contains crud actions
    let actionsCard = BUILD_ActionCard_card(ctx);

    // Contains the data view
    let dataCard = BUILD_DataCard_card(ctx);

    let viewerCard = BUILD_ViewerCard_card(ctx);

    // Lists all voxels
    let listCard = new Comps.CardGroup();
    listCard.grow = 1;
    listCard.minHeight = '10px';


    // ⬇️ ACTIVE COMPONENTS INSTANTIATED HERE ⬇️
    // List box for voxel entries
    let voxellistBox = new Comps.ListBox();
    voxellistBox.grow = 1;


    // ⬇️ BUILD PAGE STRUCTURE (keep neat or you get the 👊 BEAT 👊) ⬇️

    // Add progress bar to top page
    page.add(ctx.progressBar);
    // Add split pane
    page.add(splitPane);
        // Left pane
        splitPane.add(leftPane);
            leftPane.add(navigationCard);
            leftPane.add(actionsCard);
            leftPane.add(dataCard);
            leftPane.add(viewerCard);

        // Right pane
        splitPane.add(rightPane);
            rightPane.add(listCard);
        listCard.add(voxellistBox);


    // 🧪 TESTING ONLY 🧪 
    for (let i = 0; i < 100; i++) {
        voxellistBox.add(new Comps.ListItem());
    }
    
    page.onPageShow = ()=>{
        ctx.voxelViewer.forceUpdate();
    }

    page.setContextObject(ctx);
    return page;
}
// Sub function to build nav card
function BUILD_Navigation_card(ctx){
    let card = new Comps.CardGroup();

    let vRail = new Comps.VerticalRail();
    vRail.grow = 1;

    let heading = new Comps.Heading('Navigation');

    let hRail = new Comps.HorizontalRail();
    hRail.grow = 1;
    hRail.justifyContent = 'space-around';

    ctx.purePageButton = new Comps.Button('Pure Data');
    ctx.partialPageButton = new Comps.Button('Partial Data');

    card.add(vRail);
        vRail.add(heading);
        vRail.add(hRail);
            hRail.add(ctx.purePageButton);
            hRail.add(ctx.partialPageButton);

    return card;
}
// Sub function to build the crud action card
function BUILD_ActionCard_card(ctx) {
    let card = new Comps.CardGroup();

    let rail = new Comps.VerticalRail();
    rail.grow = 1;

    // Action header
    let heading = new Comps.Heading('Actions');

    // Button rail
    let bRail = new Comps.HorizontalRail();
    bRail.grow = 1;
    bRail.justifyContent = 'space-around';

    // Action buttons
    ctx.createButton = new Comps.Button('Create');
    ctx.editButton = new Comps.Button('Edit');
    ctx.deleteButton = new Comps.Button('Delete');


    card.add(rail);
    rail.add(heading);
    rail.add(bRail);
    bRail.add(ctx.createButton);
    bRail.add(ctx.editButton);
    bRail.add(ctx.deleteButton);


    return card;
}
// Sub function to build data card
function BUILD_DataCard_card(ctx) {
    let card = new Comps.CardGroup();

    let vRail = new Comps.VerticalRail();
    vRail.grow = 1;

    let heading = new Comps.Heading('Voxel Data');

    let nRail = new Comps.HorizontalRail();
    nRail.grow = 1;
    nRail.justifyContent = 'space-between';
    nRail.margin = '0 0 8px 0';

    let tRail = new Comps.HorizontalRail();
    tRail.margin = '0 0 8px 0';
    tRail.grow = 1;
    let tpuRail = new Comps.HorizontalRail();
    tpuRail.grow = 1;
    tpuRail.justifyContent = 'center';
    let tpaRail = new Comps.HorizontalRail();
    tpaRail.grow = 1;
    tpaRail.justifyContent = 'center';

    ctx.puVoxelRail = new Comps.HorizontalRail();
    ctx.puVoxelRail.grow = 1;
    ctx.puVoxelRail.justifyContent = 'space-between';

    ctx.paVoxelRail = new Comps.HorizontalRail();
    ctx.paVoxelRail.grow = 1;
    ctx.paVoxelRail.justifyContent = 'space-between';
    ctx.paVoxelRail.enabled = false;

    ctx.nameField = new Comps.TextField();
    ctx.nameField.placeholder = 'Enter Voxel Name';
    ctx.nameField.grow = 1;

    ctx.pureRadio = new Comps.RadioButton();
    ctx.pureRadio.checked = true;
    ctx.pureDropdown = new Comps.DropDown();
    ctx.pureDropdown.placeholder = 'Select Data';
    ctx.pureDropdown.grow = 1;
    ctx.pureNewButton = new Comps.Button('New');

    ctx.partialRadio = new Comps.RadioButton();
    ctx.partialDropdown = new Comps.DropDown();
    ctx.partialDropdown.placeholder = 'Select Data';
    ctx.partialDropdown.grow = 1;
    ctx.partialNewButton = new Comps.Button('New');

    let puLbl = ctx.pureDropdown.generateLabelComponent('Pure:');
    puLbl.minWidth = '45px';
    let paLbl = ctx.partialDropdown.generateLabelComponent('Partial:');
    paLbl.minWidth = '45px';

    card.add(vRail);
        vRail.add(heading);
        vRail.add(nRail);
            nRail.add(ctx.nameField.generateLabelComponent('Name:'));
            nRail.add(ctx.nameField);
        vRail.add(tRail);
            tRail.add(new Comps.InputLabel('Type:'));
            tRail.add(tpuRail);
                tpuRail.add(ctx.pureRadio.generateLabelComponent('Pure'));
                tpuRail.add(ctx.pureRadio);
            tRail.add(tpaRail);
                tpaRail.add(ctx.partialRadio.generateLabelComponent('Partial'));
                tpaRail.add(ctx.partialRadio);
        vRail.add(ctx.puVoxelRail);
            ctx.puVoxelRail.add(puLbl);
            ctx.puVoxelRail.add(ctx.pureDropdown);
            ctx.puVoxelRail.add(ctx.pureNewButton);
        vRail.add(ctx.paVoxelRail);
            ctx.paVoxelRail.add(paLbl);
            ctx.paVoxelRail.add(ctx.partialDropdown);
            ctx.paVoxelRail.add(ctx.partialNewButton);

    return card;
}

function BUILD_ViewerCard_card(ctx){
    let card = new Comps.CardGroup();
    card.minHeight = '250px';
    let vRail = new Comps.VerticalRail();
    vRail.grow = 1;
    ctx.voxelViewer = new Viewer3D();

    card.add(vRail);
        vRail.add(ctx.voxelViewer);
    

    return card;
}
