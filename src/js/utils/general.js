// min(포함)과 max(포함)사이의 랜덤한 정수를 리턴합니다.
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
