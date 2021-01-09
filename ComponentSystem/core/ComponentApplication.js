import { UIManager } from '/ComponentSystem/ui/UIManager.js'

export class ComponentApplication{
    _UI;
    
    constructor(){
    }

    initializeApp(){
        this._UI = new UIManager();
    }

    get UI(){
        return this._UI;
    }
}