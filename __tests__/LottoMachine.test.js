import Lotto from "../src/domain/Lotto.js";
import LottoMachine from "../src/domain/LottoMachine.js";

describe("발행한 로또 번호와 입력한 로또 번호의 일치 갯수를 기반으로 로또 상태를 매칭한다", () => {
  test("숫자 5개가 일치하고 보너스 숫자가 존재하는 경우 2등을 반환한다.", () => {
    // given
    const issuedLottoNumbers = [new Lotto([2, 3, 4, 5, 6, 7])];
    const enteredLottoNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    // when
    const machine = new LottoMachine(issuedLottoNumbers);

    // then
    expect(
      machine.getMatchedLottoRank(enteredLottoNumbers, bonusNumber)
    ).toEqual([{ RANK: 2, COUNT: 5, REWORD: 30_000_000, IS_BONUS: true }]);
  });

  test("숫자 5개 일치하고 보너스 숫자가 존재하지 않는 경우 3등을 반환한다", () => {
    // given
    const issuedLottoNumbers = [new Lotto([2, 3, 4, 5, 6, 7])];
    const enteredLottoNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 40;

    // when
    const machine = new LottoMachine(issuedLottoNumbers);

    // then
    expect(
      machine.getMatchedLottoRank(enteredLottoNumbers, bonusNumber)
    ).toEqual([{ RANK: 3, COUNT: 5, REWORD: 1_500_000, IS_BONUS: false }]);
  });
});
