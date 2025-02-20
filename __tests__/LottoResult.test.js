import Lotto from "../src/domain/Lotto";
import LottoResult from "../src/domain/LottoResult.js";
import WinningLotto from "../src/domain/WinningLotto.js";

describe("로또 당첨 결과 및 수익률 테스트", () => {
  test("로또 번호와 당첨 번호를 비교한다", () => {
    //given
    const winningLotto = new WinningLotto([1, 2, 4, 5, 6, 8], 9);
    const lotto1 = new Lotto([1, 2, 3, 4, 5, 6]);
    const lotto2 = new Lotto([2, 9, 11, 31, 10, 18]);
    const lottoArray = [lotto1, lotto2];
    const expectedResult = { 3: 0, 4: 0, 5: 1, 6: 0, bonus: 0 };

    //when
    const lottoResult = new LottoResult(winningLotto, lottoArray);
    const matchingResult = lottoResult.calculateResult();

    //then
    expect(matchingResult).toStrictEqual(expectedResult);
  });
});
