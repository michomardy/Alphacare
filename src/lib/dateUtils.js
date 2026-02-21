export const formatDateForSitemap = (dateString) => {
  if (!dateString) return '2026-01-28';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '2026-01-28';
    return date.toISOString().split('T')[0];
  } catch (e) {
    return '2026-01-28';
  }
};