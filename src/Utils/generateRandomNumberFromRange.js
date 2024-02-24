/**
 * 시작 숫자와 끝 숫자를 받아서 해당 범위의 랜덤한 숫자를 반환 합니다.
 * @param { number } start
 * @param { number } end
 * @returns { number }
 */

const generateRandomNumberFromRange = (start, end) => {
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

export default generateRandomNumberFromRange;
