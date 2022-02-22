function isNumber(value) {
  return !isNaN(value);
}

function isDividedByThousand(value) {
  return value % 1000 === 0;
}

function isValidChargeAmountRange(chargeAmount) {
  return chargeAmount >= 1000 && chargeAmount <= 10000;
}

export function isValidLottoNumberRange(value) {
  return 1 <= value && value <= 45;
}

export function isValidlottoNumbers(lottoNumbers) {
  return (
    lottoNumbers.length === 6 &&
    lottoNumbers.every(
      (lottoNumber) => isValidLottoNumberRange(lottoNumber) && Number.isInteger(lottoNumber)
    )
  );
}

export const validator = {
  checkChargeAmount: (chargeAmount) => {
    if (!isNumber(chargeAmount)) {
      throw new Error('입력된 금액이 숫자가 아닙니다. 1000 이상 10000 이하의 금액을 입력해주세요.');
    }

    if (!isDividedByThousand(chargeAmount)) {
      throw new Error(
        '입력된 금액이 1000으로 나누어 떨어지지 않습니다. 1000으로 나누어 떨어지는 금액을 입력해주세요.'
      );
    }

    if (!isValidChargeAmountRange(chargeAmount)) {
      throw new Error(
        '입력된 금액이 1000부터 10000 사이가 아닙니다. 1000 이상 10000 이하의 금액을 입력해주세요.'
      );
    }
  },
};
