import { InputLabel } from '/ComponentSystem/ui/components/ComponentLibrary.js';

export class Component {
    _child_key_counter;
    _name;
    _dom_element;
    _parent_component;
    _child_components;

    constructor(name) {
        if (name === undefined) {
            console.error('Components need a name!');
            return;
        }

        this._name = name;
        this._dom_element = document.createElement(this._name);
        this._child_container_element = document.createElement(this._name + '-children');
        this._child_components = new Array();
        this._child_key_counter = 0;
    }

    // Generate a simple key and add
    add(component) {
        if (component instanceof Component) {
            if (!this._child_components.includes(component)) {
                let key = this._child_key_counter++;
                this._child_components[key] = component;
                this._dom_element.appendChild(component.domElement);
            }
            else {
                console.warn('Component is already a child, not added again!');
            }
        }
        else {
            console.warn('That was not a component, object not added!');
        }
    }

    remove(component) {
        if (component instanceof Component) {
            if (this._child_components.includes(component)) {
                removeByValue(component, this._child_components);
                this._dom_element.removeChild(component.domElement);
            }
        }
        else {
            console.warn('That was not a component, object not added!');
        }
    }

    subscribe(event, handler) {
        this._dom_element.addEventListener(event, handler);
    }

    unsubscribe(event, handler) {
        this._dom_element.removeEventListener(event, handler);
    }

    // Shortcuts for dom editiing
    element(type) {
        return document.createElement(type);
    }

    findID(ID) {
        return document.getElementById(ID);
    }

    // Create a label component
    // Automatically assigns for/name attribs
    generateLabelComponent(text){
        if(this._dom_element.type == 'radio'){
            this._dom_element.setAttribute('value', text.toLowerCase());
        }
        return new InputLabel(text, this);
    }

    get name() {
        return this._name;
    }

    get domElement() {
        return this._dom_element;
    }

    get childComponents() {
        return this._child_components;
    }

    set parentComponent(parent) {
        this._parent_component = parent;
    }

    get parentComponent() {
        return this._parent_component;
    }

    get hasChildren() {
        return this._child_components.length > 0 ? true : false;
    }

    // Style Shortcuts

    set padding(val){
        this._dom_element.style.padding = val;
    }

    get padding(){
        return this._dom_element.style.padding;
    }

    set margin(val){
        this._dom_element.style.margin = val;
    }

    get margin(){
        return this._dom_element.style.margin;
    }

    // Width
    set width(width) {
        this._dom_element.style.width = width;
    }

    get width() {
        return this._dom_element.style.width;
    }

    // Height
    set height(height) {
        this._dom_element.style.height = height;
    }

    get height() {
        return this._dom_element.style.height;
    }

    // Background color
    set background(col) {
        this._dom_element.style.backgroundColor = col;
    }

    get background() {
        return this._dom_element.style.backgroundColor;
    }

    // Visibility
    set visible(vis) {
        this._dom_element.style.visibility = vis ? 'visible' : 'hidden';
    }

    get visible() {
        return this._dom_element.style.visibility == 'visible';
    }

    // Enable
    set enabled(enable) {
        this._dom_element.style.display = enable ? '' : 'none';
    }

    get enabled() {
        return this._dom_element.style.display != 'none' ? true : false;
    }

    // Should this component grow along it's parent's axis
    set grow(val) {
        this._dom_element.style.flexGrow = val ? 1 : 0;
    }

    get grow() {
        this._dom_element.style.flexGrow;
    }

    // How content is justified
    set justifyContent(val) {
        this._dom_element.style.justifyContent = val;
    }

    get justifyContent() {
        this._dom_element.style.justifyContent;
    }

    // Fit content or shrink down
    set minHeight(val) {
        this._dom_element.style.minHeight = val;
    }

    get minHeight() {
        return this._dom_element.style.minHeight;
    }

    set minWidth(val) {
        this._dom_element.style.minWidth = val;
    }

    get minWidth() {
        return this._dom_element.style.minWidth;
    }
}

function removeByValue(value, array) {
    for (let key in array) {
        console.log(array[key]);
        if (array[key] == value) {
            delete array[key];
        }
    }
}