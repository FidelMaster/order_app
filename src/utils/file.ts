/** 
 * Obtiene el formato del archivo a raiz del nombre del documento
 * @param fileName Nombre del archivo
 * @returns formato
 */
export const getFormatFromFileName = (fileName: string | undefined): string => {
    const parts = fileName?.split('.');
    const fileFormat = parts[parts.length - 1];
    return fileFormat;
};
