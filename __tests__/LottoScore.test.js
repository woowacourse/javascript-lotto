import Lotto from "../src/domain/Lotto";
import LottoMachine from "../src/domain/LottoMachine";
import LottoScore from "../src/domain/LottoScore";

describe("LottoMachine 객체 단위테스트", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 10;
  const lottoMachine = new LottoMachine();

  test("로또들의 점수를 비교하는 함수 테스트", () => {
    const lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
    const lotto2 = new Lotto([2, 3, 4, 5, 6, 7]);
    const lotto3 = new Lotto([3, 4, 5, 6, 8, 9]);
    const lottoScore = new LottoScore([lotto1, lotto2, lotto3]);

    lottoMachine.compareLottos(
      [lotto1, lotto2, lotto3],
      winningNumbers,
      bonusNumber,
      lottoScore
    );
    lottoScore.compareLottosScore();

    expect(lottoScore.lottoRanking).toEqual({
      "3개 일치": 0,
      "4개 일치": 1,
      "5개 일치": 1,
      "5개 일치, 보너스 볼 일치": 0,
      "6개 일치": 1,
    });
  });

  test("총 수익을 계산하는 함수 테스트", () => {
    const lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
    const lotto2 = new Lotto([2, 3, 4, 5, 6, 7]);
    const lotto3 = new Lotto([3, 4, 5, 6, 8, 9]);
    const lottoScore2 = new LottoScore([lotto1, lotto2, lotto3]);

    lottoMachine.compareLottos(
      [lotto1, lotto2, lotto3],
      winningNumbers,
      bonusNumber,
      lottoScore2
    );
    lottoScore2.compareLottosScore();
    lottoScore2.calculateTotalBenefit();
    expect(lottoScore2.totalBenefit).toBe(2_001_550_000);
  });

  test("총 수익률을 계산하는 함수 테스트", () => {
    const lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
    const lotto2 = new Lotto([2, 3, 4, 5, 6, 7]);
    const lotto3 = new Lotto([3, 4, 5, 6, 8, 9]);
    const lottoScore3 = new LottoScore([lotto1, lotto2, lotto3]);

    lottoMachine.compareLottos(
      [lotto1, lotto2, lotto3],
      winningNumbers,
      bonusNumber,
      lottoScore3
    );
    lottoScore3.compareLottosScore();

    expect(lottoScore3.getLottoBenefitRate(1)).toBe(2001550);
  });
});
