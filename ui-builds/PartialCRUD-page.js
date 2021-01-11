import * as Comps from '/ComponentSystem/ui/components/ComponentLibrary.js';
import { Viewer3D } from '/ComponentSystem/ui/components/Viewer3D.js';

// Build PARTIAL page and assign it's variables
// Card groups and more complex sub UI are built by sub functions
export function BUILD_PartialCreation_page() {
    // Define context for page
    let ctx = {};

    let page = new Comps.AppPage();
    // The progress bar at page top
    ctx.progressBar = new Comps.ProgressBar();
    let topRail = new Comps.HorizontalRail();
    let navCard = BUILD_Navigation_card(ctx);

    page.add(ctx.progressBar);
    page.add(topRail);
        topRail.add(navCard);


    page.setContextObject(ctx);
    return page;
}

// Sub function to build nav card
function BUILD_Navigation_card(ctx){
    let card = new Comps.CardGroup();
    card.minWidth = '250px';

    let vRail = new Comps.VerticalRail();
    vRail.grow = 1;

    let heading = new Comps.Heading('Navigation');

    let hRail = new Comps.HorizontalRail();
    hRail.grow = 1;
    hRail.justifyContent = 'space-around';

    ctx.voxelPageButton = new Comps.Button('Master Voxel');
    ctx.purePageButton = new Comps.Button('Pure Data');

    card.add(vRail);
        vRail.add(heading);
        vRail.add(hRail);
            hRail.add(ctx.voxelPageButton);
            hRail.add(ctx.purePageButton);

    return card;
}