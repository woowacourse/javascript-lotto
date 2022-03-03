import Lotto from "../model/Lotto.js";
import LottoGame from "../model/LottoGame.js";
import { LOTTO_NUMBER, MATCH_COUNT_INFO, WINNER_PRICE } from "../utils/constants.js";

describe("로또 앱 기능 테스트", () => {
  test(`하나의 로또를 생성하면 배열에 ${LOTTO_NUMBER.LENGTH}개의 숫자가 추가된다.`, () => {
    const lotto = new Lotto();
    lotto.generateRandomNumber();

    expect(lotto.numbers.length).toBe(LOTTO_NUMBER.LENGTH);
  });

  test("로또 티켓들을 생성한 개수만큼 로또 배열들이 추가된다.", () => {
    const lottoGame = new LottoGame();
    const inputCount = 4;
    lottoGame.generateLottoTickets(inputCount);

    expect(lottoGame.lottos.length).toBe(inputCount);
  });

  test("당첨 개수의 금액에 따라 수익률이 계산된다.", () => {
    const lottoGame = new LottoGame();
    lottoGame.lottos = [[1, 2, 3, 43, 44, 45]];
    lottoGame.generateResult([1, 2, 3, 4, 5, 6], 7);

    expect(lottoGame.profitRate).toBe(500);
  });

  test("일치 개수에 따라 당첨 통계의 당첨 개수가 계산된다.", () => {
    const lottoGame = new LottoGame();
    lottoGame.lottos = [[1, 2, 3, 4, 5, 45]];
    lottoGame.generateResult([1, 2, 3, 4, 5, 9], 45);

    const obj = {
      [MATCH_COUNT_INFO.THREE]: [WINNER_PRICE.FIFTH, 0],
      [MATCH_COUNT_INFO.FOUR]: [WINNER_PRICE.FOURTH, 0],
      [MATCH_COUNT_INFO.FIVE]: [WINNER_PRICE.THIRD, 0],
      [MATCH_COUNT_INFO.BONUS]: [WINNER_PRICE.SECOND, 1],
      [MATCH_COUNT_INFO.SIX]: [WINNER_PRICE.FRIST, 0],
    };
    expect(lottoGame.result).toEqual(obj);
  });
});
