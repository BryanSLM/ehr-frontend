import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cedulaValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cedula = control.value;

    const provincia = parseInt(cedula.substring(0, 2), 10);
    if (provincia < 1 || provincia > 24)
      return { cedulaInvalida: 'Código de provincia inválido' };

    const digitos = cedula.split('').map(Number);
    const verificador = digitos.pop(); // Último dígito
    let suma = 0;

    for (let i = 0; i < digitos.length; i++) {
      let valor = digitos[i];
      if (i % 2 === 0) {
        valor *= 2;
        if (valor > 9) valor -= 9;
      }
      suma += valor;
    }

    const calculado = (10 - (suma % 10)) % 10;
    return verificador === calculado ? null : { cedulaInvalida: true };
  };
}
