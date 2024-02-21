/**
 * @template T
 * @param {T[]} array - 특정 배열
 * @param {number} indexA - 스왑을 위한 A 인덱스
 * @param {number} indexB - 스왑을 위한 B 인덱스
 */
export const swap = (array, indexA, indexB) => {
  [array[indexA], array[indexB]] = [array[indexB], array[indexA]];
};

/**
 * @param {number[]} array - 숫자 들이 있는 배열
 * @returns {number[]} 오름차순으로 정렬된 숫자 배열
 */
export const sortByAscending = (numbers) => numbers.sort((numberA, numberB) => numberA - numberB);
