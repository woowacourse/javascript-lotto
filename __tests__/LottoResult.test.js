import Lotto from "../src/step1/domains/Lotto";
import LottoResult from "../src/step1/domains/LottoResult";
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

describe("로또 결과 도메인 테스트", () => {
  const lottos = [
    new Lotto([1, 2, 3, 18, 28, 40], lottoRules),
    new Lotto([1, 3, 17, 18, 23, 33], lottoRules),
    new Lotto([1, 2, 3, 4, 5, 7], lottoRules),
  ];

  const winningLotto = new WinningLotto(
    new Lotto([1, 2, 3, 4, 5, 6], lottoRules),
    7,
    lottoRules
  );

  const lottoResult = new LottoResult(lottoRules);

  test("구입한 로또들과 당첨 로또를 입력받아 등수를 확인하여 로또 결과판을 만든다.", () => {
    const resultBoard = lottoResult.generateResultBoard(lottos, winningLotto);

    const EXPECTED_BOARDS = {
      first: 0,
      second: 1,
      third: 0,
      fourth: 0,
      fifth: 1,
      nothing: 1,
    };

    expect(resultBoard).toEqual(EXPECTED_BOARDS);
  });

  test("구입 금액을 입력받아 총 수익률을 계산한다", () => {
    const amount = lottos.length * lottoRules.getLottoPrice();
    const returnRate = lottoResult.calculateReturnRate(amount);

    const EXPECTED_RETURN_RATE = 1000166.67;

    expect(returnRate).toBe(EXPECTED_RETURN_RATE);
  });
});
