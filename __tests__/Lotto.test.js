import { BONUS, WINNING } from "../src/constants/constant.js";
import Lotto from "../src/domain/Lotto.js";
import purchaseLottoCount from "../src/domain/LottoMachine/purchaseLottoCount.js";

test("로또의 1장 가격은 1000원이다.", () => {
  const money = 1000;
  expect(purchaseLottoCount(money)).toBe(1);
});

describe("로또 도메인 테스트", () => {
  const lottoNumber = [1, 2, 3, 4, 5, 6];
  const reverseLottoNumber = [6, 5, 4, 3, 2, 1];

  test("Lotto 인스턴스의 로또 번호는 6자리이다.", () => {
    const lotto = new Lotto(lottoNumber);
    expect(lotto.lottoNumbers.length).toBe(6);
  });

  test("Lotto 인스턴스가 생성될 때 로또 번호가 오름차순으로 정렬되어야 한다.", () => {
    const lotto = new Lotto(reverseLottoNumber);
    expect(lotto.lottoNumbers).toEqual(lottoNumber);
  });

  test("Lotto 인스턴스는 당첨 번호를 정확히 카운트 한다.", () => {
    const lotto = new Lotto(lottoNumber);

    const answerLotto = {
      1: WINNING,
      2: WINNING,
      3: WINNING,
      4: WINNING,
      5: WINNING,
      6: WINNING,
    };

    const result = lotto.compareWinningNumbers(answerLotto);

    expect(result).toEqual({ winningCount: 6, bonusCount: 0 });
  });
  test("Lotto 인스턴스는 당첨 번호와 보너스 번호를 정확히 카운트 한다.", () => {
    const lotto = new Lotto(lottoNumber);

    const answerLotto = {
      1: WINNING,
      2: WINNING,
      3: WINNING,
      4: WINNING,
      5: WINNING,
      6: BONUS,
    };

    const result = lotto.compareWinningNumbers(answerLotto);

    expect(result).toEqual({ winningCount: 5, bonusCount: 1 });
  });
});
