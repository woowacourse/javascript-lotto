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
    const winningNumbers = [2, 5, 11, 16, 32, 38];
    hasBonus.compareNumbers(winningNumbers);
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

  test("총 수익을 계산하는 함수 테스트", () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
    lotto1.compareNumbers(winningNumbers);
    const lotto2 = new Lotto([2, 3, 4, 5, 6, 7]);
    lotto2.compareNumbers(winningNumbers);
    const lotto3 = new Lotto([3, 4, 5, 6, 8, 9]);
    lotto3.compareNumbers(winningNumbers);
    const lottos = new Lottos([lotto1, lotto2, lotto3]);
    lottos.compareLottosScore();

    lottos.calculateBenefit();

    expect(lottos.getTotalBenefit()).toBe(2001550000);
  });

  test("총 수익률을 계산하는 함수 테스트", () => {
    const winningNumbers = [1, 2, 3, 4, 5, 6];

    const lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
    lotto1.compareNumbers(winningNumbers);
    const lotto2 = new Lotto([2, 3, 4, 5, 6, 7]);
    lotto2.compareNumbers(winningNumbers);
    const lotto3 = new Lotto([3, 4, 5, 6, 8, 9]);
    lotto3.compareNumbers(winningNumbers);
    const lottos = new Lottos([lotto1, lotto2, lotto3]);

    lottos.compareLottosScore();
    lottos.calculateBenefit();

    expect(lottos.getBenefitRate(1000)).toBe(2001550);
  });
});
