import { swap } from './array.js';
import { deepFreeze } from './object/object.js';

/**
 * @module Random
 * 랜덤 값들에 대한 연산을 담당하는 유틸리티 모듈
 */
const Random = deepFreeze({
  /**
   * @param {number[]} targetArray - 임의의 숫자 배열
   * @returns {number[]} 무작위로 섞인 숫자 배열
   */
  shuffle(targetArray) {
    for (let currentIndex = targetArray.length - 1; currentIndex > 0; currentIndex -= 1) {
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

      swap({ targetArray, indexA: currentIndex, indexB: randomIndex });
    }

    return targetArray;
  },

  /**
   * @param {{start : number, end : number, count : number}} numberDetails - 시작 번호, 끝 번호, 배열 길이가 담긴 객체
   * @returns {number[]} start ~ end 사이의 랜덤 값이 담긴 배열
   */
  pickUniqueNumbersInRange({ start, end, count }) {
    const rangeArray = Array.from({ length: end - start + 1 }, (_, index) => start + index);

    return this.shuffle(rangeArray).slice(0, count);
  },
});

export default Random;
