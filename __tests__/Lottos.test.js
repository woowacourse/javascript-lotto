import Lottos from "../src/Lottos";
import Lotto from "../src/Lotto";

describe("Lotto 객체 단위테스트", () => {
  test("로또들의 점수를 비교하는 함수 테스트", () => {
    const lotto1 = new Lotto([8, 21, 23, 41, 42, 43]);

    const lottos = new Lottos([lotto1]);
    lottos.addScoreBoard("3");

    expect(lottos.getLottoRanking()).toEqual({
      3: 1,
      4: 0,
      5: 0,
      "5 bonus": 0,
      6: 0,
    });
  });

  test("로또들의 점수를 비교하는 함수 테스트(보너스 숫자 있는 경우)", () => {
    const hasBonus = new Lotto([3, 5, 11, 16, 32, 38]);
    const winningNumbers = [2, 5, 11, 16, 32, 38]
    hasBonus.compareNumbers(winningNumbers)
    hasBonus.checkBonusNumber(5);
    
    const lottos = new Lottos([hasBonus]);

    lottos.compareLottosScore();

    expect(lottos.getLottoRanking()).toEqual({
      3: 0,
      4: 0,
      5: 0,
      "5 bonus": 1,
      6: 0,
    });
  });
});
