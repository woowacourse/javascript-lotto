import { swap } from './array.js';
import { deepFreeze } from './object/object.js';

/**
 * @module Random
 * 랜덤 값들에 대한 연산을 담당하는 유틸리티 모듈
 */
const Random = deepFreeze({
  /**
   * @param {number[]} array - 임의의 숫자 배열
   * @returns {number[]} 무작위로 섞인 숫자 배열
   */
  shuffle(array) {
    for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex -= 1) {
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

      swap(array, currentIndex, randomIndex);
    }

    return array;
  },

  /**
   * @param {number} start - 시작을 나타내는 숫자
   * @param {number} end - 끝을 나타내는 숫자
   * @param {number} count - 배열 길이
   * @returns {number[]} start ~ end 사이의 랜덤 값이 담긴 배열
   */
  pickUniqueNumbersInRange(start, end, count) {
    const rangeArray = Array.from({ length: end - start + 1 }, (_, index) => start + index);

    return this.shuffle(rangeArray).slice(0, count);
  },
});

export default Random;
