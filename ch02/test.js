"use strict";

import * as R from 'ramda';
import { coordinate, zipCode } from '../model/ValueObjects';
import { deepFreeze } from './helper';
import { Student } from '../model/Student'
import { Address } from '../model/Address'

describe('Chapter 2', () => {
    test("Playing with immutable value objets", () => {
        let princetonZip = zipCode('08544', '3345');
        expect(princetonZip.toString()).toEqual('08544-3345');

        let greenwich = coordinate(51.4778, 0.0015);
        expect(greenwich.toString()).toEqual('(51.4778,0.0015)');

        let newCoord = greenwich.translate(10, 10).toString();
        expect(newCoord).toEqual('(61.4778,10.0015)');
    });

    test("Deep freeze object", () => {
        let address = new Address('US');
        let student = new Student('444-44-4444', 'Joe', 'Smith', 'Harvard', 1960, address);
        let frozenStudent = deepFreeze(student);

        expect(() => {
            frozenStudent.firstname = 'Emmit';
        }).toThrow(TypeError);
        expect(() => {
            frozenStudent.address.country = 'Canada';
        }).toThrow(TypeError);
    });

    test("Playing with Lenses", () => {
        let z = zipCode('06544', '1234');
        let address = new Address('US', 'NJ', 'Princeton', z, 'Alexander st.');
        let student = new Student('444-44-4444', 'Joe', 'Smith', 'Princeton University', 1960, address);

        let zipPath = ['address', 'zip'];
        var zipLens = R.lensPath(zipPath);
        expect(R.view(zipLens, student)).toEqual(z);

        let beverlyHills = zipCode('90210', '5678');
        let newStudent = R.set(zipLens, beverlyHills, student);
        expect(R.view(zipLens, newStudent).code()).toEqual(beverlyHills.code());
        expect(R.view(zipLens, student)).toEqual(z);
        expect(newStudent).not.toEqual(student)
    });

    test("Negation", () => {
        function negate(func) {
            return () => {
                return !func.apply(null, arguments);
            };
        }

        function isNull(val) {
            return val === null;
        }

        let isNotNull = negate(isNull);
        expect(isNotNull(null)).toBeFalsy;
        expect(isNotNull({})).toBeTruthy;
    });
});
