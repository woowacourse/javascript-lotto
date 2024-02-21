import Lotto from "../src/step1/domains/Lotto";
import LottoResult from "../src/step1/domains/LottoResult";
import WinningLotto from "../src/step1/domains/WinningLotto";

describe("로또 결과 도메인 테스트", () => {
  //given
  const ANSWER = [1, 2, 3, 4, 5, 6];
  const BONUS_NUMBER = 7;
  const lottos = [
    new Lotto([1, 2, 3, 18, 28, 40]),
    new Lotto([1, 3, 17, 18, 23, 33]),
    new Lotto([1, 2, 3, 4, 5, 7]),
  ];
  const EXPECTED_BOARDS = {
    first: 0,
    second: 1,
    third: 0,
    fourth: 0,
    fifth: 1,
  };
  const lottoResult = new LottoResult();

  test("로또 결과판을 만든다.", () => {
    //when
    lottoResult.generateResult(
      lottos,
      new WinningLotto(new Lotto(ANSWER), BONUS_NUMBER)
    );

    //then
    expect(lottoResult.getRankBoard()).toEqual(EXPECTED_BOARDS);
  });

  test("수익률을 계산한다.", () => {
    // given
    const EXPECTED_RETURN_RATE = 1000166667.0;

    // when
    const returnRate = lottoResult.calculateReturnRate(3);

    // then
    expect(returnRate).toBe(EXPECTED_RETURN_RATE);
  });
});
