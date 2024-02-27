import LottoStore from "../src/step1/domains/LottoStore";
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

const runInvalidAmountException = (invalidAmount, errorMessage = "[ERROR]") => {
  expect(() => {
    new LottoStore(lottoRules).publishLottos(invalidAmount);
  }).toThrow(errorMessage);
};

describe("로또 상점 도메인 테스트", () => {
  describe("유효성 테스트", () => {
    test("로또 구입 금액에 공백일 경우 예외를 발생시킨다", () => {
      const INVALID_AMOUNT = "";
      runInvalidAmountException(INVALID_AMOUNT);
    });
    test("로또 구입 금액에 문자열일 경우 예외를 발생시킨다", () => {
      const INVALID_AMOUNT = "harry";
      runInvalidAmountException(INVALID_AMOUNT);
    });
    test("로또 구입 금액이 100인 경우, 1000의 배수가 아니므로 예외를 발생시킨다", () => {
      const INVALID_AMOUNT = 100;
      runInvalidAmountException(INVALID_AMOUNT);
    });
    test("로또 구입 금액이 1200인 경우, 1000의 배수가 아니므로 예외를 발생시킨다", () => {
      const INVALID_AMOUNT = 1200;
      runInvalidAmountException(INVALID_AMOUNT);
    });
    test("로또 구입 금액이 200000인 경우, 최대 구입 가능 금액(10만원)을 초과하므로 예외를 발생시킨다", () => {
      const INVALID_AMOUNT = 200000;
      runInvalidAmountException(INVALID_AMOUNT);
    });
  });

  describe("기능 테스트", () => {
    test("10000원의 로또 구입 금액을 입력하면 10개의 로또를 발행한다", () => {
      const AMOUNT = "10000";
      const EXPECTED_LENGTH = 10;

      const lottos = new LottoStore(lottoRules).publishLottos(AMOUNT);

      expect(lottos.length).toBe(EXPECTED_LENGTH);
    });
  });
});
