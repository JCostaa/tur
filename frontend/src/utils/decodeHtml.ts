/**
 * Decodifica entidades HTML como &eacute;, &ocirc;, etc.
 * @param text - Texto com entidades HTML
 * @returns Texto decodificado
 */
export const decodeHtmlEntities = (text: string | undefined | null): string => {
  if (!text) return '';
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

