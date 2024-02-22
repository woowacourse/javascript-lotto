import Lotto from "../domain/Lotto.js";
import LottoMoney from "../domain/LottoMoney.js";
import LottoNumber from "../domain/LottoNumber.js";

const PREFIX = {
  error: "[ERROR]",
};

const ERROR_MESSAGE = {
  lottoNumbersTooManyOrLess: `로또 번호는 ${Lotto.NUMBER_COUNT}개입니다.`,
  lottoNumbersOverlapped: "당첨 번호는 중복될 수 없습니다.",
  bonusNumberOverlapped: "보너스 번호는 당첨 번호와 중복될 수 없습니다.",

  lottoMoneyNotNumber: `구입 금액은 ${LottoMoney.MIN}원 이상 ${LottoMoney.MAX}원 이하의 정수로 입력해야 합니다.`,
  lottoMoneyNotInRange: `구입 금액은 ${LottoMoney.MIN}원 이상 ${LottoMoney.MAX}원 이하의 정수로 입력해야 합니다.`,
  lottoMoneyNotInteger: `구입 금액은 ${LottoMoney.MIN}원 이상 ${LottoMoney.MAX}원 이하의 정수로 입력해야 합니다.`,

  lottoNumberNotNumber: `각 로또 번호는 ${LottoNumber.MIN} 이상 ${LottoNumber.MAX} 이하의 정수로 입력해야 합니다.`,
  lottoNumberOutOfRange: `각 로또 번호는 ${LottoNumber.MIN} 이상 ${LottoNumber.MAX} 이하의 정수로 입력해야 합니다.`,

  commandNotInList: "잘못된 커맨드 입력입니다.",

  generateRandomNumberInvalidRange: "랜덤 숫자 배열의 범위가 잘못되었습니다.",
};

export { PREFIX, ERROR_MESSAGE };
