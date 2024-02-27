import Lotto from "../src/step1/domains/Lotto";
import WinningLotto from "../src/step1/domains/WinningLotto";
import LottoRules from "../src/step1/domains/LottoRules";
import {
  LOTTO_RULES,
  LOTTO_REWARDS,
  exchangeRank,
} from "../src/step1/constants/rules";

const lottoRules = new LottoRules({
  price: LOTTO_RULES.price,
  maxQuantity: LOTTO_RULES.maxQuantity,
  lottoLength: LOTTO_RULES.length,
  minNumber: LOTTO_RULES.minNumber,
  maxNumber: LOTTO_RULES.maxNumber,
  rewardInfo: LOTTO_REWARDS,
  exchangeRank: exchangeRank,
});

const runInvalidBonusNumberException = (
  invalidBonusNumber,
  errorMessage = "[ERROR]"
) => {
  const NUMBERS = [1, 2, 3, 4, 5, 6];

  expect(() => {
    new WinningLotto(
      new Lotto(NUMBERS, lottoRules),
      invalidBonusNumber,
      lottoRules
    );
  }).toThrow(errorMessage);
};

describe("당첨 로또 도메인 테스트", () => {
  describe("유효성 테스트", () => {
    test("보너스 번호에 공백을 입력할 경우 예외를 발생시킨다.", () => {
      const INVALID_BONUS_NUMBER = "";
      runInvalidBonusNumberException(INVALID_BONUS_NUMBER);
    });
    test("보너스 번호에 문자열을 입력할 경우 예외를 발생시킨다.", () => {
      const INVALID_BONUS_NUMBER = "harry";
      runInvalidBonusNumberException(INVALID_BONUS_NUMBER);
    });
    test("보너스 번호에 입력 가능한 최소 숫자(1)보다 작은 0을 입력할 경우 예외를 발생시킨다.", () => {
      const INVALID_BONUS_NUMBER = 0;
      runInvalidBonusNumberException(INVALID_BONUS_NUMBER);
    });
    test("보너스 번호에 입력 가능한 최대 숫자(45)보다 큰 46을 입력할 경우 예외를 발생시킨다.", () => {
      const INVALID_BONUS_NUMBER = 46;
      runInvalidBonusNumberException(INVALID_BONUS_NUMBER);
    });
    test("보너스 번호에 당첨 번호와 중복되는 수를 입력할 경우 예외를 발생시킨다.", () => {
      const INVALID_BONUS_NUMBER = 1;
      runInvalidBonusNumberException(INVALID_BONUS_NUMBER);
    });
  });
});
