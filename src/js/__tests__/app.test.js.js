import Lotto from "../model/Lotto.js";
import LottoGame from "../model/LottoGame.js";
import { LOTTO_NUMBER } from "../utils/constants.js";

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
});
