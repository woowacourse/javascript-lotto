import { NUMBER_COUNT } from "../domain/Lotto.js";
import { MIN as LottoMoneyMin, MAX as LottoMoneyMax } from "../domain/LottoMoney.js";
import { MIN as lottoNumberMin, MAX as lottoNumberMax } from "../domain/LottoNumber.js";

const PREFIX = {
  error: "[ERROR]",
};

const ERROR_MESSAGE = {
  lottoNumbersTooManyOrLess: `로또 번호는 ${NUMBER_COUNT}개입니다.`,
  lottoNumbersOverlapped: "당첨 번호는 중복될 수 없습니다.",
  bonusNumberOverlapped: "보너스 번호는 당첨 번호와 중복될 수 없습니다.",

  lottoMoneyNotNumber: `구입 금액은 ${LottoMoneyMin}원 이상 ${LottoMoneyMax}원 이하의 정수로 입력해야 합니다.`,
  lottoMoneyNotInRange: `구입 금액은 ${LottoMoneyMin}원 이상 ${LottoMoneyMax}원 이하의 정수로 입력해야 합니다.`,
  lottoMoneyNotInteger: `구입 금액은 ${LottoMoneyMin}원 이상 ${LottoMoneyMax}원 이하의 정수로 입력해야 합니다.`,

  lottoNumberNotNumber: `각 로또 번호는 ${lottoNumberMin} 이상 ${lottoNumberMax} 이하의 정수로 입력해야 합니다.`,
  lottoNumberOutOfRange: `각 로또 번호는 ${lottoNumberMin} 이상 ${lottoNumberMax} 이하의 정수로 입력해야 합니다.`,

  commandNotInList: "잘못된 커맨드 입력입니다.",

  generateRandomNumberInvalidRange: "랜덤 숫자 배열의 범위가 잘못되었습니다.",
};

export { PREFIX, ERROR_MESSAGE };
