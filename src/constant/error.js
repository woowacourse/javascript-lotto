import { LOTTO } from "./lotto.js";

const ERROR_MESSAGE = {
    NOT_A_NUMBER: '[ERROR] 숫자를 입력해주세요.',
    NOT_DIVIDED_1000: '[ERROR] 1000으로 나누어 떨어지는 숫자를 입력해주세요.',
    UNDER_MIN_PRICE: '[ERROR] 최소 결제 금액은 1,000원 이상입니다.',
    EXCEED_MAX_PRICE: '[ERROR] 최대 결제 금액은 100,000원 미만입니다.',
    LOTTO_LENGTH: `[ERROR] 당첨 번호는 ${LOTTO.LENGTH}개여야 합니다.`,
    DUPLICATE_NUMBER: '[ERROR] 중복된 숫자가 있습니다.',
    NUMBER_OUT_OF_RANGE: '[ERROR] 1과 45 사이의 숫자를 입력해주세요.',
    YES_OR_NO: '[ERROR] Y 혹은 N으로 입력해 주세요.'
}

export default ERROR_MESSAGE;