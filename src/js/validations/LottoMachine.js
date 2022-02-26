<<<<<<< HEAD
<<<<<<< HEAD
import { LOTTO } from "../constants/constants.js";
=======
import { LOTTO } from '../constants/constants.js';
>>>>>>> df9aee0 (refactor: valiate 로직 파일 분리)
=======
import { LOTTO } from "../constants/constants.js";
>>>>>>> 7ea7bab (refactor: Validation LottoMachine isValidUnit -> isDividedByPrice)

function isOverZero(money) {
  return money > 0;
}

<<<<<<< HEAD
<<<<<<< HEAD
function isDividedByPrice(money) {
=======
function isValidUnit(money) {
>>>>>>> df9aee0 (refactor: valiate 로직 파일 분리)
=======
function isDividedByPrice(money) {
>>>>>>> 7ea7bab (refactor: Validation LottoMachine isValidUnit -> isDividedByPrice)
  return money % LOTTO.PRICE === 0;
}

export default function validateMoney(money) {
<<<<<<< HEAD
<<<<<<< HEAD
  if (!isDividedByPrice(money)) {
    throw new Error(`${LOTTO.PRICE}단위로 입력해주세요`);
  }
  if (!isOverZero(money)) {
    throw new Error("0원보다 큰 금액을 입력해주세요.");
=======
  if (!isValidUnit(money)) {
    throw new Error(`${LOTTO.PRICE}단위로 입력해주세요`);
  }
  if (!isOverZero(money)) {
    throw new Error('0원보다 큰 금액을 입력해주세요.');
>>>>>>> df9aee0 (refactor: valiate 로직 파일 분리)
=======
  if (!isDividedByPrice(money)) {
    throw new Error(`${LOTTO.PRICE}단위로 입력해주세요`);
  }
  if (!isOverZero(money)) {
    throw new Error("0원보다 큰 금액을 입력해주세요.");
>>>>>>> 7ea7bab (refactor: Validation LottoMachine isValidUnit -> isDividedByPrice)
  }
}
