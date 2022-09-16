export const getDateByTimestamp = (timestamp) => {
  const now = new Date();
  const date = new Date(Number(timestamp)); // текущая дата

  const day = now.getDay() - date.getDay();
  const year = now.getFullYear() - date.getFullYear();
  const hours = now.getHours() - date.getHours();
  const minutes = now.getMinutes() - date.getMinutes();
  const month = now.getMonth() - date.getMonth();

  if (year === 0) {
    if (day === 0) {
      if (hours === 0) {
        if (minutes >= 0 && minutes < 5) return "1 минуту назад";
        if (minutes >= 5 && minutes < 10) return "5 минут назад";
        if (minutes >= 10 && minutes < 30) {
          return "10 минут назад";
        }
        return "30 минут назад";
      }
      return date.getHours() + ":" + date.getMinutes();
    }
    return date.getDay() + "." + (date.getMonth() + 1);
  }

  return date.getDay() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
};
