import dayjs from 'dayjs';

export function formatearFecha(fecha: Date | string) {
  if (!fecha) {
    return 'Sin fecha';
  }
  return dayjs(fecha).format('DD/MM/YYYY');
}
export function formatearFechaHora(fecha: Date | string) {
  if (!fecha) {
    return 'Sin fecha';
  }
  return dayjs(fecha).format('DD/MM/YYYY HH:mm');
}
