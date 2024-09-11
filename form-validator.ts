import { ValidatorFunction, ValidationError } from './validators';

type ValidatorConfig<T> = {
    [K in keyof T]: ValidatorFunction<T[K]> | ValidatorFunction<T[K]>[];
};

type ValidatorRules<T> = {
    [K in keyof T]: ValidatorFunction<T[K]>;
};

type ValidationResult<T extends Record<string, unknown>> =
    | {
          // eslint-disable-next-line no-unused-vars
          [K in keyof T]?: ValidationError;
      }
    | null;

export class FormValidator<T extends Record<string, unknown>> {
    private readonly rules: ValidatorRules<T>;

    constructor(configuration: ValidatorConfig<T>) {
        if (
            !configuration ||
            typeof configuration !== 'object' ||
            Object.keys(configuration).length === 0
        ) {
            throw new Error('Configuration must be a non-empty object');
        }

        this.rules = {} as ValidatorRules<T>;

        for (const [field, validator] of Object.entries(configuration)) {
            if (Array.isArray(validator)) {
                if (validator.length === 0) {
                    throw new Error(
                        `Validator array for field ${field} should not be empty`,
                    );
                }
                this.rules[field as keyof T] =
                    this.composeValidators(validator);
            } else if (typeof validator === 'function') {
                this.rules[field as keyof T] = validator;
            } else {
                throw new Error(`Invalid validator for field: ${field}`);
            }
        }
    }

    validate(data: T): ValidationResult<T> {
        const errors: Record<string, ValidationError> = {};

        for (const [field, value] of Object.entries(data)) {
            const validator = this.rules[field as keyof T];
            if (validator) {
                const error = validator(value as T[keyof T]);
                if (error) {
                    errors[field] = error;
                }
            }
        }

        return Object.keys(errors).length > 0 ? errors : null;
    }

    private composeValidators<T>(
        validators: ValidatorFunction<T>[],
    ): ValidatorFunction<T> {
        return (value: T): ValidationError => {
            const errors: ValidationError = {};

            for (const validator of validators) {
                const error = validator(value);
                if (error) {
                    Object.assign(errors, error);
                }
            }

            return Object.keys(errors).length > 0 ? errors : null;
        };
    }
}
