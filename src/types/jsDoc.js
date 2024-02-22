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

/**
 * @typedef {object} BonusNumberValidationTypes
 * @property {CommonValidationType} isTypeOfNumber - 입력된 보너스 번호가 자연수인지 확인하는 객체
 * @property {CommonValidationType} isValidRange - 입력된 보너스 번호가 1 ~ 45의 숫자 번호를 갖는지 확인하는 객체
 * @property {CommonValidationType} isUniqueBonusNumber - 입력된 보너스 번호가 당첨 번호 중 포함 되는 번호가 있는지 확인하는 객체
 */

/**
 * @typedef {object} BonusNumberValidator
 * @property {WinningNumberValidationTypes} validationTypes - 검사할 항목들에 대한 객체
 * @property {(inputValue : string, winningNumber : number[]) => void} check - 유효성 검사를 진행하는 메서드
 */

/**
 * @typedef {object} RetryCommandValidator
 * @property {WinningNumberValidationTypes} validationTypes - 검사할 항목들에 대한 객체
 * @property {(inputValue : string, winningNumber : number[]) => void} check - 유효성 검사를 진행하는 메서드
 */

/**
 * @typedef {object} RetryCommandValidationTypes
 * @property {CommonValidationType} isValidCommand - 입력한 재시작 명령어가 유효한지 확인하는 객체
 */

/**
 * @typedef {object} BuyLottoDetail
 * @property {number} buyLottoPrice - 로또 구입 금액
 * @property {LottoNumber[]} lottoNumbers - 로또 번호들
 */

/**
 * @typedef {object} LottoDrawDetail
 * @property {number[]} winningNumber - 당첨 번호
 * @property {LottoNumber[]} lottoNumbers - 구입한 로또 번호들
 * @property {number} bonusNumber - 보너스 번호
 */

/**
 * @typedef {object} WinningRankResult
 * @property {number} '1st' - 1등 당첨 횟수
 * @property {number} '2nd' - 2등 당첨 횟수
 * @property {number} '3rd' - 3등 당첨 횟수
 * @property {number} '4th' - 4등 당첨 횟수
 * @property {number} '5th' - 5등 당첨 횟수
 */

/**
 * @typedef {'1st' | '2nd' | '3rd' | '4th' | '5th'} Rank
 */

/**
 * @typedef {object} RankRuleDetail
 * @property {number} match - 당첨 된 횟수
 * @property {boolean} hasBonus - 보너스 번호 포함 여부
 * @property {string} description - 당첨 정보에 대한 설명
 */

/**
 * @typedef {object} RankRule
 * @property {RankRuleDetail} '1st' - 1등 당첨 횟수
 * @property {RankRuleDetail} '2nd' - 2등 당첨 횟수
 * @property {RankRuleDetail} '3rd' - 3등 당첨 횟수
 * @property {RankRuleDetail} '4th' - 4등 당첨 횟수
 * @property {RankRuleDetail} '5th' - 5등 당첨 횟수
 */

/**
 * @typedef {[number, number, number, number, number, number]} LottoNumber
 */

export {};
