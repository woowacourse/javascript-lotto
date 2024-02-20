import Lotto from "../src/step1/domains/Lotto";

class LottoResult {}

describe("로또 결과 도메인 테스트", () => {
  test("로또 결과판을 만든다.", () => {
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

    //when
    const result = LottoResult.generateResult(lottos, {
      answer: ANSWER,
      bonusNumber: BONUS_NUMBER,
    });

    //then
    expect(result).toEqual(EXPECTED_BOARDS);
  });
});
