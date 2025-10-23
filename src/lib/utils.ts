// Utility functions for common operations
export const getMultilingualText = (text: string | { en: string; [key: string]: string }) => {
  if (typeof text === 'string') return text;
  return text.en || Object.values(text)[0] || '';
};

export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString();
};
