export const dateToArray = (date: Date): Array<number> => {
  return [
    new Date(date).getFullYear(),
    new Date(date).getMonth() + 1,
    new Date(date).getDate(),
    new Date(date).getHours(),
    new Date(date).getMinutes(),
    new Date(date).getSeconds(),
  ];
};

export const arrayToDate = (array: Array<number>): Date => {
  return new Date(array[0], array[1], array[2], array[3], array[4], array[5]);
};
