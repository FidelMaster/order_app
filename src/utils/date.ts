import moment from 'moment';

/**
 * Formatea la fecha en el formato 'DD/MM/YYYY'.
 * @param {string} date - La fecha a formatear.
 * @returns {string} - La fecha formateada.
 */
export const formatDateDDMMYYYY = (date: string): string => {
  try {
    return moment(date).format('DD/MM/YYYY');
  } catch (error: any) {
    console.error(`Error al formatear la fecha: ${error.message}`);
    return 'Fecha inválida';
  }
}