import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export function birthDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    const date = new Date(value);
    const now = new Date();

    // Fecha inválida
    if (isNaN(date.getTime())) {
      return { birthDateInvalid: 'La fecha no es válida' };
    }

    // Fecha en el futuro
    if (date > now) {
      return { birthDateFuture: 'La fecha no puede ser en el futuro' };
    }

    return null;
  };
}
