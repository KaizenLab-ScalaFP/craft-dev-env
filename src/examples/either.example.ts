import { Either, left, right } from 'fp-ts/lib/Either'

const minLength = (s: string): Either<string, string> =>
    s.length >= 6 ? right(s) : left('at least 6 characters')

const oneCapital = (s: string): Either<string, string> =>
    /[A-Z]/g.test(s) ? right(s) : left('at least one capital letter')

const oneNumber = (s: string): Either<string, string> =>
    /[0-9]/g.test(s) ? right(s) : left('at least one number')

import { chain } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'

const validatePassword = (s: string): Either<string, string> =>
    pipe(
        minLength(s),
        chain(oneCapital),
        chain(oneNumber)
    )

test('validate ab', () => {
    expect(validatePassword('ab')).toStrictEqual(left("at least 6 characters"));
});

test('validate abcdef', () => {
    expect(validatePassword('abcdef')).toStrictEqual(left("at least one capital letter"));
});

test('validate Abcdef', () => {
    expect(validatePassword('Abcdef')).toStrictEqual(left("at least one number"));
});

test('validate Abcdef1', () => {
    expect(validatePassword('Abcdef1')).toStrictEqual(right("Abcdef1"));
});