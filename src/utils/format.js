export const getKRMoneyString = (number) => {
  if (Number.isNaN(number)) return;

  return number.toLocaleString('ko-KR')
};
