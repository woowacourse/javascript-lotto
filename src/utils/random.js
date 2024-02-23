import { deepFreeze } from './object/object.js';

/**
 * @module Random
 * 랜덤 값들에 대한 연산을 담당하는 유틸리티 모듈
 */
const Random = deepFreeze({
  /**
   * @param {number} maxValue - shuffle할 가장 큰 값
   * @returns {number[]} 무작위로 섞인 숫자 배열
   */
  shuffle(maxValue) {
    const selectableNumbers = Array.from({ length: maxValue }, (_, i) => i + 1);
    const shuffledArray = [];

    while (selectableNumbers.length !== 0) {
      const randomIndex = Math.floor(Math.random() * selectableNumbers.length);
      const randomValueInArray = selectableNumbers.splice(randomIndex, 1)[0];

      shuffledArray.push(randomValueInArray);
    }

    return shuffledArray;
  },

  /**
   * @param {{start : number, end : number, count : number}} numberDetails - 시작 번호, 끝 번호, 배열 길이가 담긴 객체
   * @returns {number[]} start ~ end 사이의 랜덤 값이 담긴 배열
   */
  pickUniqueNumbersInRange({ end, count }) {
    return this.shuffle(end).slice(0, count);
  },
});

export default Random;
