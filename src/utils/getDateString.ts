export const getDateString = (date: Date) => {
  const dateString = date.toLocaleString('ru-RU', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    dateString.substring(0, 2).toLocaleUpperCase() +
    dateString.substring(2, dateString.length - 3)
  );
};
