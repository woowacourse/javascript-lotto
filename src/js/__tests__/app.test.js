import LottoGameModel from "../model/LottoGameModel.js";
import { BONUS } from "../utils/constants.js";

describe("로또 앱 기능 테스트", () => {
  test("로또 티켓들을 생성한 개수만큼 로또 배열들이 추가된다.", () => {
    const lottoGame = new LottoGameModel();
    const inputCount = 4;
    lottoGame.generateLottoTickets(inputCount);
    expect(lottoGame.lottos.length).toBe(inputCount);
  });

  test("당첨 개수의 금액에 따라 수익률이 계산된다.", () => {
    const lottoGame = new LottoGameModel();
    lottoGame.lottos = [[1, 2, 3, 43, 44, 45]];
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;
    lottoGame.generateResult(winningNumbers, bonusNumber);
    expect(lottoGame.profitRate).toBe(400);
  });

  test("일치 개수에 따라 당첨 개수가 계산된다.", () => {
    const lottoGame = new LottoGameModel();
    lottoGame.lottos = [
      [1, 2, 3, 43, 44, 45],
      [1, 2, 3, 4, 43, 44],
      [1, 2, 3, 4, 5, 44],
      [1, 2, 3, 4, 5, 6],
      [1, 2, 3, 4, 5, 45],
    ];
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 45;
    const result = {
      3: 1,
      4: 1,
      5: 1,
      6: 1,
      [BONUS]: 1,
    };
    lottoGame.generateResult(winningNumbers, bonusNumber);
    expect(lottoGame.result).toEqual(result);
  });
});
