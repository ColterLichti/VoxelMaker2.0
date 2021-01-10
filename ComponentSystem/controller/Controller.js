import { ComponentApplication } from '/ComponentSystem/core/ComponentApplication.js';

export class Controller{

    _application;
    _view;
    _ctx;

    constructor(application){
        this._application = application;
    }

    get application(){
        return this._application;
    }

    set view(page){
        this._view = page;
        this._ctx = this._view.context;
    }

    get view(){
        return this._view;
    }

    get ctx(){
        return this._ctx;
    }

    createView(){}
}