/**
 * @template T
 * @param {{target : T[], indexA : number, indexB : number}} swapParams - array 내 요소 들을 swap을 위한 targetArray, indexA, indexB
 */
export const swap = ({ targetArray, indexA, indexB }) => {
  [targetArray[indexA], targetArray[indexB]] = [targetArray[indexB], targetArray[indexA]];
};

/**
 * @param {number[]} numbers - 숫자 들이 있는 배열
 * @returns {number[]} 오름차순으로 정렬된 숫자 배열
 */
export const sortByAscending = (numbers) => numbers.sort((numberA, numberB) => numberA - numberB);
