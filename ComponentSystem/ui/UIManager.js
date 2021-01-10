import * as Comps from '/ComponentSystem/ui/components/ComponentLibrary.js';

export class UIManager {
    _key_counter;
    _app_window;
    _stylesheet_element;
    _page_list;

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

        // Intantiate page list
        this._page_list = new Array();
    }

    addPage(name, page) {
        if (name !== undefined && name !== '', page instanceof Comps.AppPage) {
            page.enabled = !this._app_window.hasChildren;
            this._app_window.add(page);
            this._page_list[name] = page;
        }
        else {
            console.warn('Must provide a valid page and name/alias!');
        }
    }

    removePage(name) {
        if (name !== undefined && name !== '') {
            if (this._page_list[name] !== undefined) {
                this._app_window.remove(this._page_list[name]);
                delete this._page_list[name];
            }
        }
    }

    showPage(name) {
        if (name !== undefined && name !== '' && this._page_list[name] !== undefined) {
            for(let key in this._page_list){
                let page = this._page_list[key];
                page.enabled = false;
            }

            this._page_list[name].enabled = true;
            this._page_list[name].onPageShow();
        }
        else {
            console.warn('Could not find requested page: ' + name);
        }
    }

}
