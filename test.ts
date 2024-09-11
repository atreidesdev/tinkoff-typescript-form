import { FormValidator } from './form-validator';
import { maxLength, nonEmptyArray, requiredText } from './validators';

const validator = new FormValidator({
    field1: nonEmptyArray,
    field2: requiredText,
    field3: [requiredText, maxLength(10)],
    field4: [requiredText, maxLength(20)],
});

describe('validator', () => {
    it('all data is correct', () => {
        const dataToValidate = {
            field1: ['abcdefg', 'abcdefg'],
            field2: 'abcdefg',
            field3: 'abcdefg',
            field4: 'abcdefg',
        };
        expect(validator.validate(dataToValidate)).toBe(null);
    });
    it('field1 is empty', () => {
        const dataToValidate = {
            field1: [],
            field2: 'abcdefg',
            field3: 'abcdefg',
            field4: 'abcdefg',
        };
        expect(validator.validate(dataToValidate)).toStrictEqual({
            field1: { nonEmptyArray: true },
        });
    });
    it('field2 no text', () => {
        const dataToValidate = {
            field1: ['abcdefg', 'abcdefg'],
            field2: '',
            field3: 'abcdefg',
            field4: 'abcdefg',
        };
        expect(validator.validate(dataToValidate)).toStrictEqual({
            field2: { requiredText: true },
        });
    });

    it('field3 out of length', () => {
        const dataToValidate = {
            field1: ['abcdefg', 'abcdefg'],
            field2: 'abcdefg',
            field3: 'abcdefgabcdefg',
            field4: 'abcdefg',
        };
        expect(validator.validate(dataToValidate)).toStrictEqual({
            field3: { maxLength: { actualLength: 14, limitLength: 10 } },
        });
    });

    it('field4 out of length', () => {
        const dataToValidate = {
            field1: ['abcdefg', 'abcdefg'],
            field2: 'abcdefg',
            field3: 'abcdefg',
            field4: 'abcdefgabcdefgabcdefg',
        };
        expect(validator.validate(dataToValidate)).toStrictEqual({
            field4: { maxLength: { actualLength: 21, limitLength: 20 } },
        });
    });

    it('all data is incorrect', () => {
        const dataToValidate = {
            field1: [],
            field2: '',
            field3: 'abcdefgabcdefgabcdefg',
            field4: 'abcdefgabcdefgabcdefg',
        };
        expect(validator.validate(dataToValidate)).toStrictEqual({
            field1: { nonEmptyArray: true },
            field2: { requiredText: true },
            field3: { maxLength: { actualLength: 21, limitLength: 10 } },
            field4: { maxLength: { actualLength: 21, limitLength: 20 } },
        });
    });
});
