import * as Comps from '/ComponentSystem/ui/components/ComponentLibrary.js';
import { Viewer3D } from '/ComponentSystem/ui/components/Viewer3D.js';

// Build PURE page and assign it's variables
// Card groups and more complex sub UI are built by sub functions
export function BUILD_PureCreation_page() {
    // Define context for page
    let ctx = {};

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

    let navCard = BUILD_Navigation_card(ctx);

    let actionCard = BUILD_ActionCard_card(ctx);

    let dataCard = BUILD_DataCard_card(ctx);

    page.add(ctx.progressBar);
    page.add(splitPane);
        splitPane.add(leftPane);
            leftPane.add(navCard);
            leftPane.add(actionCard);
            leftPane.add(dataCard);
        splitPane.add(rightPane);


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

    ctx.voxelPageButton = new Comps.Button('Master Voxel');
    ctx.partialPageButton = new Comps.Button('Partial Data');

    card.add(vRail);
        vRail.add(heading);
        vRail.add(hRail);
            hRail.add(ctx.voxelPageButton);
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

function BUILD_DataCard_card(ctx) {
    let card = new Comps.CardGroup();
    let vRail = new Comps.VerticalRail();
    vRail.grow = 1;
    let dataHeading = new Comps.Heading('Pure Data');

    let topAxis = new Comps.HorizontalRail();
    topAxis.grow = 1;
    topAxis.justifyContent = 'space-around';

    let botAxis = new Comps.HorizontalRail();
    botAxis.grow = 1;
    botAxis.justifyContent = 'space-around';
    botAxis.margin = '8px 0 0 0';

    ctx.North = new Comps.PureFaceButton('top', 'north');
    ctx.North.faceImage = '/images/north_t.png';

    ctx.East = new Comps.PureFaceButton('top', 'east');
    ctx.East.faceImage = '/images/east_t.png';

    ctx.South = new Comps.PureFaceButton('bottom', 'south');
    ctx.South.faceImage = '/images/south_t.png';

    ctx.West = new Comps.PureFaceButton('bottom', 'west');
    ctx.West.faceImage = '/images/west_t.png';

    ctx.Up = new Comps.PureFaceButton('top', 'up');
    ctx.Up.faceImage = '/images/up_t.png';

    ctx.Down = new Comps.PureFaceButton('bottom', 'down');
    ctx.Down.faceImage = '/images/down_t.png';

    card.add(vRail);
        vRail.add(dataHeading);
        vRail.add(topAxis);
            topAxis.add(ctx.North);
            topAxis.add(ctx.East);
            topAxis.add(ctx.Up);
        vRail.add(botAxis);
            botAxis.add(ctx.South);
            botAxis.add(ctx.West);
            botAxis.add(ctx.Down);

    return card;
}