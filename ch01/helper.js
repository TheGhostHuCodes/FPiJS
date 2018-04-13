'use strict';

import { Person } from '../model/Person';

var _students = {
    '444-44-4444': new Person('444-44-4444', 'Alonzo', 'Church'),
    '444444444': new Person('444-44-4444', 'Alonzo', 'Church')
};

export const db = {
    find(ssn) {
        return _students[ssn];
    }
};