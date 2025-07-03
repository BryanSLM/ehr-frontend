import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ecuPhoneNumberValidator(): ValidatorFn {
  const ecuMobilePhoneRegex = /^09\d{8}$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const sanitizedValue = value.replace(/\D/g, '');
    const valid = ecuMobilePhoneRegex.test(sanitizedValue);
    return valid ? null : { ecuPhoneNumber: true };
  };
}
