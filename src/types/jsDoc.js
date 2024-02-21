/**
 * @typedef {object} CommonValidationType
 * @property {string} errorMessage - 유효성 검사 실패 시의 에러 메시지
 * @property {(inputValue : string) => boolean} isValid - 유효성 검사 함수
 */

/**
 * @typedef {object} CommonValidationTypes
 * @property {CommonValidationType} emptyValues - 입력 값이 비어있는지를 검사하기 위한 객체
 */

/**
 * @typedef {object} CommonValidator
 * @property {CommonValidationTypes} validationTypes - 검사할 항목들에 대한 객체
 * @property {(inputValue : string) => void} check - 유효성 검사를 진행하는 메서드
 */

/**
 * @typedef {object} BuyLottoPriceValidator
 * @property {BuyLottoPriceValidationTypes} validationTypes - 검사할 항목들에 대한 객체
 * @property {(inputValue : string) => void} check - 유효성 검사를 진행하는 메서드
 */

/**
 * @typedef {object} BuyLottoPriceValidationTypes
 * @property {CommonValidationType} isTypeOfNumber - 구매 로또 금액이 숫자 인지 검사하는 객체
 * @property {CommonValidationType} notInThousandUnit - 구매 로또 금액이 1000원 단위인지 검사하는 객체
 * @property {CommonValidationType} outOfRange - 구매 로또 금액이 올바른 범위의 값인지 검사하는 객체
 */

/**
 * @typedef {object} WinningNumberValidator
 * @property {WinningNumberValidationTypes} validationTypes - 검사할 항목들에 대한 객체
 * @property {(inputValue : string) => void} check - 유효성 검사를 진행하는 메서드
 */

/**
 * @typedef {object} WinningNumberValidationTypes
 * @property {CommonValidationType} isValidType - 당첨 번호 입력 형식(자연수를 ,로 구분)이 올바른지 확인하는 객체
 * @property {CommonValidationType} isValidLength - 입력된 당첨 번호가 6개인지 확인하는 객체
 * @property {CommonValidationType} isValidRange - 입력된 당첨 번호가 1 ~ 45인지 확인하는 객체
 * @property {CommonValidationType} isUnique - 입력된 당첨 번호 중 중복된 번호가 있는지 확인하는 객체
 */

export {};
