/**
 * 현재 single export로 인해 import/prefer-default-export 관련 airbnb 컨벤션을 위배하고 있지만
 * constants 모듈이 default export 셩격에 맞지 않다는 점과 random과 관련된 상수가 추가될 수 있다고 판단되어
 * export 방식을 유지하기로 결정
 */
export const SYMBOLS = Object.freeze({
  emptyString: '',
  space: ' ',
  comma: ',',
});
