import Lottos from "../src/domain/Lottos";
import Lotto from "../src/domain/Lotto";
import LottoScore from "../src/domain/LottoScore"

describe("Lotto 객체 단위테스트", () => {
  const lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
  const lotto2 = new Lotto([2, 3, 4, 5, 6, 7]);
  const lotto3 = new Lotto([3, 4, 5, 6, 8, 9]);
  const lottos = new Lottos([lotto1, lotto2, lotto3]);
  const lottoScore = new LottoScore(lottos.lottos);
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 10
  
  test("로또들의 점수를 비교하는 함수 테스트", () => {
    lottos.compareLottosWithWinningLotto(winningNumbers, bonusNumber)
    lottoScore.compareLottosScore()

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
    const lottos2 = new Lottos([lotto1, lotto2, lotto3]);
    const lottoScore2 = new LottoScore(lottos2.lottos)
    
    lottos2.compareLottosWithWinningLotto(winningNumbers, bonusNumber);
    lottoScore2.compareLottosScore();
    lottoScore2.calculateTotalBenefit();

    expect(lottoScore2.totalBenefit).toBe(2001550000);
  });

  test("총 수익률을 계산하는 함수 테스트", () => {
    const lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
    const lotto2 = new Lotto([2, 3, 4, 5, 6, 7]);
    const lotto3 = new Lotto([3, 4, 5, 6, 8, 9]);
    const lottos3 = new Lottos([lotto1, lotto2, lotto3]);
    const lottoScore3 = new LottoScore(lottos3.lottos)

    lottos3.compareLottosWithWinningLotto(winningNumbers,bonusNumber);
    lottoScore3.compareLottosScore();

    expect(lottoScore3.getLottoBenefitRate(1)).toBe(2001550);
  });
});
