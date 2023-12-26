export const getDateDiff = (date) => {
  const nowDate = new Date();
  const createDate = new Date(date);
  const diffDate = nowDate - createDate;

  let formatDays = ~~(diffDate / (1000 * 60 * 60 * 24));

  return formatDays;
};
