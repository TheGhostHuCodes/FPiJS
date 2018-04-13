"use strict";

export function coordinate(lat, long) {
    let _lat = lat;
    let _long = long;
    return {
        latitude() {
            return _lat;
        },
        longitude() {
            return _long;
        },
        translate(dx, dy) {
            return coordinate(_lat + dx, _long + dy);
        },
        toString() {
            return `(${_lat},${_long})`;
        }
    }
}

export function zipCode(code, location = '') {
    let _code = code;
    let _location = location
    return {
        code() {
            return _code;
        },
        location() {
            return _location;
        },
        fromString(str) {
            let parts = str.split('-');
            return zipCode(parts[0], parts[1]);
        },
        toString() {
            return `${_code}-${_location}`;
        }
    }
}
