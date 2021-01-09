import * as Comps from '/ComponentSystem/ui/components/ComponentLibrary.js';

export class UIManager {
    _key_counter;
    _app_window;
    _stylesheet_element;

    constructor() {
        this._key_counter = 0;
        // Create and add app window component
        this._app_window = new Comps.AppWindow();
        document.body.innerHTML = '';
        document.body.appendChild(this._app_window.domElement);

        // Add component styles to the head
        this._stylesheet_element = document.createElement('link');
        this._stylesheet_element.href = '/ComponentSystem/ui/components/style/component-styles.css';
        this._stylesheet_element.type = 'text/css';
        this._stylesheet_element.rel = 'stylesheet';
        document.head.appendChild(this._stylesheet_element);
    }

    addPage(page) {
        if (page instanceof Comps.AppPage) {
            page.enabled = !this._app_window.hasChildren;
            this._app_window.add(page);
        }
        else {
            console.warn('Can\'t add non page object!');
        }
    }

    removePage(page) {
        if (page instanceof Comps.AppPage) {
            this._app_window.remove(page);
        }
        else {
            console.warn('Can\'t remove non page object!');
        }

        console.log(this._app_window._child_components);
    }

    showPage(page) {
        if (page instanceof Comps.AppPage) {
            for (let key in this._app_window._child_components) {
                if (page === this._app_window._child_components[key]) {
                    this._app_window._child_components[key].enabled = true;
                }
                else {
                    this._app_window._child_components[key].enabled = false;
                }
            }
        }
    }

}