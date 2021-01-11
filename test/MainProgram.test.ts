import {hello} from "../src/MainProgram";

// exercice : add more / better tests with good names

test('validate person', () => {
    expect(hello('bob')).toStrictEqual('hello bob')
});
