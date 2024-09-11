import { FormValidator } from './form-validator';
import {
    dateValidator,
    emailValidator,
    maxLength,
    nonEmptyArray,
    phoneNumberValidator,
    requiredText,
} from './validators';

const validator = new FormValidator({
    field1: nonEmptyArray,
    field2: requiredText,
    field3: [requiredText, maxLength(10)],
    field4: [requiredText, maxLength(20)],
});

const dataToValidate = {
    field1: ['field1', 'field1'],
    field2: 'field2',
    field3: 'field3',
    field4: 'field4',
};

const errors = validator.validate(dataToValidate);

console.log(errors);

const formValidator = new FormValidator({
    email: emailValidator,
    phoneNumber: phoneNumberValidator,
    date: dateValidator,
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form')!;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = {
            email: (
                form.querySelector('input[name="email"]') as HTMLInputElement
            ).value,
            phoneNumber: (
                form.querySelector(
                    'input[name="phoneNumber"]',
                ) as HTMLInputElement
            ).value,
            date: (form.querySelector('input[name="date"]') as HTMLInputElement)
                .value,
        };

        const errors = formValidator.validate(data);

        console.log(errors);
        form.querySelectorAll('input').forEach((input) => {
            input.classList.remove('error');
            const errorSpan = input.nextElementSibling as HTMLSpanElement;
            if (errorSpan) {
                errorSpan.textContent = '';
            }
        });

        if (errors) {
            Object.entries(errors).forEach(([field, error]) => {
                const input = form.querySelector(
                    `input[name="${field}"]`,
                ) as HTMLInputElement;
                if (input && error) {
                    input.classList.add('error');
                    const errorMessage = Object.values(error as object).join(
                        ', ',
                    );
                    const errorSpan =
                        input.nextElementSibling as HTMLSpanElement;
                    if (errorSpan) {
                        errorSpan.textContent = errorMessage;
                    }
                }
            });
        }
    });
});
