import Lotto from "../src/domain/Lotto";
import LottoMachine from "../src/domain/LottoMachine";

describe("LottoMachine 객체 단위테스트", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 10;
  const lottoMachine = new LottoMachine();

  test("로또들의 점수를 비교하는 함수 테스트(보너스 점수 x)", () => {
    const lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);

    lottoMachine.compareLottoNumbers(winningNumbers, lotto1);

    expect(lotto1.score).toEqual(6);
  });

  test("보너스 점수유무를 판단하는 함수 테스트", () => {
    const lotto2 = new Lotto([1, 2, 3, 4, 5, 10]);

    lottoMachine.compareBonusNumber(bonusNumber, lotto2);

    expect(lotto2.isContainBonusNumber).toBeTruthy();
  });
});
