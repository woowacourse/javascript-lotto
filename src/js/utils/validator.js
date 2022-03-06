import { LOTTO, ERROR_MESSAGE, PAYMENT } from '../configs/contants.js';

export const validate = (subject, validator, middleware = (_) => _) => {
  const modifiedSubject = middleware(subject);

  validator.every(({ test, errorMessage }) => {
    if (!test(modifiedSubject)) throw new Error(errorMessage);

    return true;
  });
};

const isNumber = (value) => typeof value === 'number' && Number.isFinite(value);

export const isEveryElementsUnique = (array) =>
  array.length === new Set(array).size;

const isDividedByThousand = (value) => value % LOTTO.PRICE === 0;

const isValidPurchaseAmountRange = (purchaseAmount) =>
  purchaseAmount >= PAYMENT.PURCHASE_AMOUNT.MIN &&
  purchaseAmount <= PAYMENT.PURCHASE_AMOUNT.MAX;

export const isValidLottoNumberRange = (value) =>
  value >= LOTTO.NUMBER_RANGE.MIN && value <= LOTTO.NUMBER_RANGE.MAX;

export const isValidlottoNumbers = (lottoNumbers) =>
  lottoNumbers.length === LOTTO.NUMBER_LENGTH &&
  lottoNumbers.every(
    (lottoNumber) =>
      isValidLottoNumberRange(lottoNumber) && Number.isInteger(lottoNumber)
  );

export const isValidLotto = (lotto) =>
  isValidlottoNumbers(lotto.numbers) && isEveryElementsUnique(lotto.numbers);

export const isValidLottoList = (lottoList, count) =>
  lottoList.length === count;

export const purchaseAmountValidator = [
  {
    test: isNumber,
    errorMessage: ERROR_MESSAGE.NOT_A_NUMBER,
  },
  {
    test: isDividedByThousand,
    errorMessage: ERROR_MESSAGE.NOT_DIVIDED_BY_THOUSAND,
  },
  {
    test: isValidPurchaseAmountRange,
    errorMessage: ERROR_MESSAGE.OUT_OF_PURCHASE_AMOUNT_RANGE,
  },
];

export const winningNumbersValidator = [
  {
    test: (winningNumbers) =>
      winningNumbers.every((num) => Number.isInteger(num)),
    errorMessage: ERROR_MESSAGE.NOT_INTEGER,
  },
  {
    test: (winningNumbers) =>
      winningNumbers.every((num) => isValidLottoNumberRange(num)),
    errorMessage: ERROR_MESSAGE.OUT_OF_LOTTO_NUMBER_RANGE,
  },
  {
    test: isEveryElementsUnique,
    errorMessage: ERROR_MESSAGE.DUPLICATED_NUMBER,
  },
];
