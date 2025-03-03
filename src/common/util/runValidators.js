/**
 * 함수 배열을 받아 순차적으로 실행하며, 예외가 발생하면 중단
 * @param {Array<Function>} validators - 실행할 함수 배열
 * @param {*} input - 각 함수에 전달할 입력값
 * @returns {*} - 모든 함수가 성공적으로 실행된 경우 최종 반환값
 */
const runValidators = (validators, input) => validators.forEach((validate) => validate(input));

export default runValidators;
