/**
 * @param {number[]} numbers - 숫자 들이 있는 배열
 * @returns {number[]} 오름차순으로 정렬된 숫자 배열
 */
export const sortByAscending = (numbers) => numbers.sort((numberA, numberB) => numberA - numberB);
