/**
 * 현재 single export로 인해 import/prefer-default-export 관련 airbnb 컨벤션을 위배하고 있지만
 * constants 모듈이 default export 셩격에 맞지 않다는 점과 추가적인 정규 표현식이 추가될 것으로 예상되어
 * export 방식을 유지하기로 결정
 */
export const INPUT_LOTTO_NUMBER_REGEXP = /^([1-9]\d?)(,[1-9]\d?)*$/;
