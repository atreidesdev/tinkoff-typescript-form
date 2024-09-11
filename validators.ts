// eslint-disable-next-line no-unused-vars
export type ValidatorFunction<T> = (value: T) => ValidationError;

export type SimpleError = true | string | number;

export type ValidationError = null | {
    [key: string]: SimpleError | ValidationError;
};

export const nonEmptyArray: ValidatorFunction<unknown[]> = (
    value: unknown[],
): ValidationError => {
    return value.length ? null : { nonEmptyArray: true };
};

export const requiredText: ValidatorFunction<string> = (
    value: string,
): ValidationError => {
    return value.trim().length ? null : { requiredText: true };
};

export const maxLength = (maxLength: number): ValidatorFunction<string> => {
    return (value: string): ValidationError => {
        return value.length <= maxLength
            ? null
            : {
                  maxLength: {
                      limitLength: maxLength,
                      actualLength: value.length,
                  },
              };
    };
};

export const emailValidator: ValidatorFunction<string> = (
    value: string,
): ValidationError => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : { email: 'Invalid email address' };
};

export const phoneNumberValidator: ValidatorFunction<string> = (
    value: string,
): ValidationError => {
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(value)
        ? null
        : { phoneNumber: 'Invalid phone number' };
};

export const dateValidator: ValidatorFunction<string> = (
    value: string,
): ValidationError => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;
    return dateRegex.test(value)
        ? null
        : { date: 'Invalid date format, use DD.MM.YYYY' };
};
