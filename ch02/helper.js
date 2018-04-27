"use strict";

const isObject = val => val && typeof val == 'object';

export function deepFreeze(obj) {
    if (isObject(obj) && !Object.isFrozen(obj)) {
        Object.keys(obj).forEach(name => deepFreeze(obj[name]));
        Object.freeze(obj);
    }
    return obj;
}