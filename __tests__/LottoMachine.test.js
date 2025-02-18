import Lotto from "../src/domain/Lotto";
import LottoMachine from "../src/domain/LottoMachine";

test("발행한 로또 번호와 입력한 로또 번호의 일치 갯수를 기반으로 로또 상태를 매칭한다.", () => {
  // given
  const issuedLottoNumbers = [new Lotto([2, 3, 4, 5, 6, 7])];
  const enteredLottoNumbers = [1, 2, 3, 4, 5, 6];

  // when
  const machine = new LottoMachine(issuedLottoNumbers);

  // then
  expect(machine.getMatchedLottoRank(enteredLottoNumbers)).toEqual([
    { COUNT: 5, IS_BONUS: true, RANK: 2, REWORD: 30000000 },
  ]);
});
