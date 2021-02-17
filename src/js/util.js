/**
 * 인자로 넘어온 min과 max를 포함하여 그 두 값
 * 사이에 해당하는 무작위 정수를 반환합니다.
 *
 * max가 min보다 크다고 가정합니다.
 *
 * @param {Number} min 최솟값
 * @param {Number} max 최댓값
 */
export const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min) + min + 1);

/**
 * 나눠지는 수를 나누는 수로 나눈, 정수로 된 몫을 반환합니다.
 * 나눗셈 몫이 소수일 경우는 그 몫을 내림한 값을 반환합니다.
 * ex) getQuotient(10, 3) => 원래 3.3333... 이지만 내림하여 3
 *
 * @param {Number} dividend 나눠지는 수
 * @param {Number} divisor  나누는 수
 */
export const getQuotient = (dividend, divisor) =>
  parseInt(dividend / divisor, 10);

/**
 * 숫자 배열을 인수로 받아서 숫자가 작은 순서대로 정렬한 뒤
 * 숫자가 오름차순으로 정렬된 배열을 반환합니다.
 * ex) sortByNumber([7,4,6,1]) => []
 *
 * @param {Array} array 정렬하고자 하는 숫자 배열
 */
export const sortByNumber = (array) => array.slice().sort((a, b) => a - b);

/**
 * DOM 요소에 접근하여 하나의 요소를 가져올 경우
 * 더 짧은 구문으로 접근하기 위해 만든 함수입니다.
 *
 * @param {string} selector 가져오고자 하는 요소의 선택자
 */
export const $ = (selector) => document.querySelector(selector);

/**
 * DOM 요소에 접근하여 여러 요소를 가져올 경우
 * 더 짧은 구문으로 접근하기 위해 만든 함수입니다.
 *
 * @param {string} selector 가져오고자 하는 요소의 선택자
 */
export const $$ = (selector) => document.querySelectorAll(selector);
