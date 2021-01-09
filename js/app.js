import { ComponentApplication } from '/ComponentSystem/core/ComponentApplication.js';
import * as Comps from '/ComponentSystem/ui/components/ComponentLibrary.js';

let application;

let page1;
let page2;

document.addEventListener('DOMContentLoaded', (event) => {
    application = new ComponentApplication();
    application.initializeApp();

    page1 = buildVoxelListView();
    page2 = BUILD_VoxelCreation_page();


    application.UI.addPage(page1);
    application.UI.addPage(page2);

    application.UI.showPage(page2);
});

function buildVoxelListView() {
    let page = new Comps.AppPage();
    let progressBar = new Comps.ProgressBar();
    page.add(progressBar);

    let split = new Comps.HorizontalRail();
    split.grow = 1;
    page.add(split);

    let crudRail = new Comps.VerticalRail();
    crudRail.width = '15%';
    crudRail.minWidth = '265px';
    split.add(crudRail);
    let buttonCard = new Comps.CardGroup();
    crudRail.add(buttonCard);
    let actionRail = new Comps.VerticalRail();
    actionRail.grow = 1;
    buttonCard.add(actionRail);

    let actionHeading = new Comps.Heading('Actions');
    actionRail.add(actionHeading);

    let buttonRail = new Comps.HorizontalRail();
    buttonRail.grow;
    buttonRail.justifyContent = 'space-around';
    actionRail.add(buttonRail);

    let createButton = new Comps.Button('Create');
    createButton.subscribe('click', (event) => {
        console.log('Create');
        application.UI.showPage(page2);
    });
    buttonRail.add(createButton);
    let editButton = new Comps.Button('Edit');
    editButton.subscribe('click', (event) => {
        console.log('Edit');
    });
    buttonRail.add(editButton);
    let deleteButton = new Comps.Button('Delete');
    deleteButton.subscribe('click', (event) => {
        console.log('Delete');
    });
    buttonRail.add(deleteButton);

    let dataCard = new Comps.CardGroup();
    crudRail.add(dataCard);
    let dataRail = new Comps.VerticalRail();
    dataRail.grow = 1;
    dataCard.add(dataRail);
    let dataHeading = new Comps.Heading('Voxel Data');
    dataRail.add(dataHeading);


    let textField = new Comps.TextField();
    textField.placeholder = 'Enter Name';
    textField.label = 'Voxel Name:';

    let textLabel = new Comps.InputLabel(textField);
    textLabel.text = 'Voxel Name:'

    dataRail.add(textLabel);
    dataRail.add(textField);

    let radioLabel = new Comps.InputLabel();
    radioLabel.text = 'Type:';

    let rb1 = new Comps.RadioButton('test');
    let rb2 = new Comps.RadioButton('test');
    let rb3 = new Comps.RadioButton('test');
    radioLabel.add(rb1);
    //radioLabel.add(rb2);
    //radioLabel.add(rb3);
    dataRail.add(radioLabel);



    let listRail = new Comps.VerticalRail();
    listRail.grow = 1;
    split.add(listRail);
    let voxelListCard = new Comps.CardGroup();
    voxelListCard.minHeight = '10px';
    voxelListCard.grow = 1;
    listRail.add(voxelListCard);

    let voxelList = new Comps.ListBox();
    voxelListCard.add(voxelList);
    voxelList.grow = 1;
    voxelList.add(new Comps.ListItem());
    voxelList.add(new Comps.ListItem());
    voxelList.add(new Comps.ListItem());
    voxelList.add(new Comps.ListItem());


    return page;
}

function BUILD_VoxelCreation_page() {
    // ⬇️ INSTANTIATE COMPONENTS / SET VALUES ⬇️

    // The page
    let page = new Comps.AppPage();

    // The progress bar at page top
    let progressBar = new Comps.ProgressBar();

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

    // Contains crud actions
    let actionsCard = new Comps.CardGroup();

    let actionRail = new Comps.VerticalRail();
    actionRail.grow = 1;

    // Action header
    let actionHeading = new Comps.Heading('Actions');

    // Button rail
    let actionButtonRail = new Comps.HorizontalRail();
    actionButtonRail.grow = 1;
    actionButtonRail.justifyContent = 'space-around';

    // Contains the data view
    let dataCard = new Comps.CardGroup();

    let dataRail = new Comps.VerticalRail();
    dataRail.grow = 1;

    // Data heading
    let dataHeading = new Comps.Heading('Voxel Data');

    let nameRail = new Comps.HorizontalRail();
    nameRail.grow = 1;
    nameRail.justifyContent = 'space-between';
    nameRail.margin = '0 0 8px 0';

    let typeRail = new Comps.HorizontalRail();
    typeRail.margin = '0 0 8px 0';
    typeRail.grow = 1;
    //typeRail.justifyContent = 'space-between';

    let pureRail = new Comps.HorizontalRail();
    pureRail.grow = 1;
    pureRail.justifyContent = 'center';

    let partialRail = new Comps.HorizontalRail();
    partialRail.grow = 1;
    partialRail.justifyContent = 'center';

    // Lists all voxels
    let listCard = new Comps.CardGroup();
    listCard.grow = 1;
    listCard.minHeight = '10px';


    // ⬇️ ACTIVE COMPONENTS INSTANTIATED HERE ⬇️

    // Action buttons
    let createButton = new Comps.Button('Create');
    createButton.subscribe('click', (event) => {
        application.UI.showPage(page1);
    });
    let editButton = new Comps.Button('Edit');
    editButton.subscribe('click', (event) => {
        console.log(pureRadio.groupValue);
    });
    let deleteButton = new Comps.Button('Delete');

    // Field for voxel name
    let nameField = new Comps.TextField();
    nameField.placeholder = '[Enter Voxel Name]';
    nameField.grow = 1;

    let typeLabel = new Comps.InputLabel('Type:');
    let pureRadio = new Comps.RadioButton('voxel-type');
    pureRadio.checked = true;
    let partialRadio = new Comps.RadioButton('voxel-type');

    // List box for voxel entries
    let voxellistBox = new Comps.ListBox();
    voxellistBox.grow = 1;






    // ⬇️ BUILD PAGE STRUCTURE (keep neat or you get the 👊 BEAT 👊) ⬇️

    // Add progress bar to top page
    page.add(progressBar);
    // Add split pane
    page.add(splitPane);
        // Left pane
        splitPane.add(leftPane);
            leftPane.add(actionsCard);
                actionsCard.add(actionRail);
                    actionRail.add(actionHeading);
                    actionRail.add(actionButtonRail);
                        actionButtonRail.add(createButton);
                        actionButtonRail.add(editButton);
                        actionButtonRail.add(deleteButton);
                        // 🏁 Branch Done 🏁

            leftPane.add(dataCard);
                dataCard.add(dataRail);
                    dataRail.add(dataHeading);
                    dataRail.add(nameRail);
                        nameRail.add(nameField.generateLabelComponent('Name:'));
                        nameRail.add(nameField);
                    dataRail.add(typeRail);
                        typeRail.add(typeLabel);
                        typeRail.add(pureRail);
                            pureRail.add(pureRadio);
                            pureRail.add(pureRadio.generateLabelComponent('Pure'));
                        typeRail.add(partialRail);                            
                            partialRail.add(partialRadio);
                            partialRail.add(partialRadio.generateLabelComponent('Partial'));


        // Right pane
        splitPane.add(rightPane);
            rightPane.add(listCard);
            listCard.add(voxellistBox);


    // ⬇️ POPULATE STRUCTURE ⬇️


    // 🧪 TESTING ONLY 🧪 
    for (let i = 0; i < 100; i++) {
        voxellistBox.add(new Comps.ListItem());
    }

    return page;
}