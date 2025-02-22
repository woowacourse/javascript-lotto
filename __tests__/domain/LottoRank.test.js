import LottoStatus from "../../src/domain/LottoStatus.js";

describe("발행한 로또 번호와 입력한 로또 번호의 일치 갯수를 기반으로 로또 Rank를 매칭한다", () => {
  test("숫자 5개가 일치하고 보너스 숫자가 존재하는 경우 2등을 반환한다.", () => {
    // given
    const issuedLottoNumbers = [[2, 3, 4, 5, 6, 7]];
    const enteredLottoNumbers = [1, 2, 3, 4, 5, 6];
    const bonusLottoNumber = 7;

    // when
    const rank = new LottoStatus({
      issuedLottoNumbers,
      enteredLottoNumbers,
      bonusLottoNumber,
    });
    rank.calculateRanks();

    // then
    expect(rank.getMatchedLottoStatus()).toEqual([
      {
        RANK: 2,
        COUNT: 5,
        REWORD: 30_000_000,
        IS_BONUS: true,
      },
    ]);
  });

  test("숫자 5개 일치하고 보너스 숫자가 존재하지 않는 경우 3등을 반환한다", () => {
    // given
    const issuedLottoNumbers = [[2, 3, 4, 5, 6, 7]];
    const enteredLottoNumbers = [1, 2, 3, 4, 5, 6];
    const bonusLottoNumber = 40;

    // when
    const rank = new LottoStatus({
      issuedLottoNumbers,
      enteredLottoNumbers,
      bonusLottoNumber,
    });
    rank.calculateRanks();

    // then
    expect(rank.getMatchedLottoStatus(enteredLottoNumbers)).toEqual([
      {
        RANK: 3,
        COUNT: 5,
        REWORD: 1_500_000,
        IS_BONUS: false,
      },
    ]);
  });
});
