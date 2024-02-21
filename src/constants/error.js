const ERROR = {
  INVALID_PURCHASE_AMOUNT_TYPE: "[ERROR] 구입 금액은 숫자로 입력해주세요.",
  INVALID_PURCHASE_AMOUNT_RANGE:
    "[ERROR] 구입 금액은 1,000원 이상의 값을 입력해주세요",
  INVALID_PURCHASE_AMOUNT_DIVIDED:
    "[ERROR] 구입 금액은 1,000원 단위로 입력해주세요.",
  INVALID_LOTTO_NUMBER_LENGTH: "[ERROR] 로또 번호로 6개를 입력해주세요.",
  INVALID_LOTTO_NUMBER_DUPLICATE: "[ERROR] 로또 번호에 중복된 숫자가 있습니다.",
  INVALID_LOTTO_NUMBER_RANGE:
    "[ERROR] 로또 번호로 1 ~ 45 사이의 숫자를 입력해주세요.",
  INVALID_LOTTO_NUMBER_TYPE: "[ERROR] 로또 번호는 숫자로만 입력해주세요.",
  INVALID_BONUS_NUMBER_DUPLICATE:
    "[ERROR] 보너스 번호는 당첨 로또 번호와 중복되면 안됩니다.",
};

export default ERROR;
