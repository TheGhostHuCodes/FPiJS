"use strict";

import * as _ from 'lodash';
import * as R from 'ramda';
import { db } from './helper';

console.log('Using Lodash: ' + _.VERSION);

describe('Chapter 1', () => {
    // "run" is an alias for functional composition.
    const run = R.compose;

    test("Listing 1.1 Functional printMessage", () => {
        const printToConsole = str => {
            console.log(str);
            return str;
        };
        const toUpperCase = str => str.toUpperCase();
        const echo = R.identity;

        const printMessage = run(printToConsole, toUpperCase, echo);
        expect(printMessage('Hello World')).toEqual('HELLO WORLD');
    });

    test("Listing 1.2 Extending printMessage", () => {
        const printToConsole = str => {
            console.log(str);
            return str;
        };
        const toUpperCase = str => str.toUpperCase();
        const echo = R.identity;

        const repeat = times => {
            return function (str = '') {
                let tokens = [];
                for (let i = 0; i < times; i++) {
                    tokens.push(str);
                }
                return tokens.join(' ');
            };
        };

        const printMessage = run(printToConsole, repeat(3), toUpperCase, echo);
        expect(printMessage('Get Functional')).toEqual('GET FUNCTIONAL GET FUNCTIONAL GET FUNCTIONAL');

    });

    test("Listing 1.3 Imperative showStudent function with side effects", () => {
        function showStudent(ssn) {
            let student = db.find(ssn);
            if (student !== null) {
                let studentInfo = `<p>${student.ssn},${student.firstname},${student.lastname}</p>`;
                console.log(studentInfo);
                return studentInfo;
            } else {
                throw new Error('Student not found');
            }

            expect(showStudent('444-44-4444')).toEqual('<p>444-44-4444,Alonzo,Church</p>');
        };
    });

    const curry = R.curry;

    test("Listing 1.4 Decomposing the showStudent program", () => {
        const find = curry((db, id) => {
            let obj = db.find(id);
            if (obj === null) {
                throw new Error("Object not found!");
            }
            return obj;
        });

        const csv = student => `${student.ssn},${student.firstname},${student.lastname}`;

        const append = curry((source, info) => {
            source(info);
            return info;
        });

        const showStudent = run(append(console.log), csv, find(db));

        expect(showStudent('444444444')).toEqual('444-44-4444,Alonzo,Church');
    });

    test("Listing 1.5 Programming with function chains", () => {
        const enrollments = [
            { enrolled: 2, grade: 100 },
            { enrolled: 2, grade: 80 },
            { enrolled: 1, grade: 89 }
        ];

        const result = _.chain(enrollments)
            .filter(student => student.enrolled > 1)
            .map(_.property('grade'))
            .mean()
            .value();

        console.log(result);
        expect(result).toEqual(90);
    });

});