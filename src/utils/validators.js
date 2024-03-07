/**
 * 전달된 숫자가 정수인지 여부
 * @param {number} number
 */
export const isInteger = (number) => Number.isInteger(number);

/**
 * 전달된 숫자들이 모두 정수인지 여부
 * @param {number[]} numbers
 */
export const isIntegers = (numbers) => numbers.every((number) => Number.isInteger(number));

/**
 * 전달된 문자열이 공백인지 여부
 * @param {string} input
 */
export const isEmptyInput = (input) => !input;
