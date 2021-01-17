import { Vector3 } from '/node_modules/three/build/three.module.js';

export class Values {}
Object.defineProperties(Values,{
    _positionOffsets: {
        value: [
            new Vector3(0, 0, 1),
            new Vector3(1, 0, 0),
            new Vector3(0, 0, -1),
            new Vector3(-1, 0, 0),
            new Vector3(0, 1, 0),
            new Vector3(0, -1, 0),
        ],
        writable: false,
        enumerable: false,
        configurable: false
    },
    _rotationOffsets: {
        value: [
            new Vector3(0, 0, 0),
            new Vector3(0, 1.5707963267948966, 0),
            new Vector3(0, 3.141592653589793, 0),
            new Vector3(0, 4.71238898038469, 0),
            new Vector3(-1.5707963267948966, 0, 0),
            new Vector3(1.5707963267948966, 0, 0),
        ],
        writable: false,
        enumerable: false,
        configurable: false
    },
    direction: {
        value: [
            'north',
            'east',
            'south',
            'west',
            'up',
            'down',
        ],
        writable: false,
        enumerable: false,
        configurable: false
    },
    getDirectionIndex: {
        value: (key) =>{
            for (let i = 0; i < Values.direction.length; i++) {
                const dir = Values.direction[i];
                if(dir === key)
                    return i;
            }
        },
        writable: false,
        enumerable: false,
        configurable: false
    },
    getPositionOffset: {
        value: (key) =>{
            return Values._positionOffsets[Values.getDirectionIndex(key)].clone();
        },
        writable: false,
        enumerable: false,
        configurable: false
    },
    getRotationOffset: {
        value: (key) =>{
            return Values._rotationOffsets[Values.getDirectionIndex(key)].clone();
        },
        writable: false,
        enumerable: false,
        configurable: false
    },
    CRUDState: {
        value: {
            CREATING: 0,
            EDITING: 1
        },
        writable: false,
        enumerable: false,
        configurable: false
    }
});