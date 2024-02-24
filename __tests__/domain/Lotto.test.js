/* eslint-disable max-lines-per-function */
import Lotto from "../../src/domain/Lotto.js";

describe("Lotto 객체 테스트", () => {
  const HAVE_BONUS_NUMBER_TEXT = "가지고있으면";
  const WHATEVER_TEXT = "상관없이";

  describe("로또 객체는 자신이 몇등인지 알아야한다.", () => {
    const winningLottoNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 20;

    test.each([
      {
        lottoNumbers: [1, 2, 3, 4, 5, 6],
        matchCount: 6,
        isBonus: WHATEVER_TEXT,
        expectedRank: "FIRST_PLACE",
      },
      {
        lottoNumbers: [1, 2, 3, 4, 5, 20],
        matchCount: 5,
        isBonus: HAVE_BONUS_NUMBER_TEXT,
        expectedRank: "SECOND_PLACE",
      },
      {
        lottoNumbers: [1, 2, 3, 4, 5, 7],
        matchCount: 5,
        isBonus: WHATEVER_TEXT,
        expectedRank: "THIRD_PLACE",
      },
      {
        lottoNumbers: [1, 2, 3, 4, 7, 8],
        matchCount: 5,
        isBonus: WHATEVER_TEXT,
        expectedRank: "FOURTH_PLACE",
      },
      {
        lottoNumbers: [1, 2, 3, 7, 8, 9],
        matchCount: 5,
        isBonus: WHATEVER_TEXT,
        expectedRank: "FIFTH_PLACE",
      },
      {
        lottoNumbers: [7, 8, 9, 10, 11, 12],
        matchCount: 5,
        isBonus: WHATEVER_TEXT,
        expectedRank: "NONE_PLACE",
      },
    ])(
      "당첨번호와 $matchCount개 일치하고 보너스 번호 $isBonus $expectedRank를 리턴한다.",
      ({ lottoNumbers, expectedRank }) => {
        const lotto = new Lotto(lottoNumbers);
        const rank = lotto.getRank({ winningLottoNumbers, bonusNumber });

        expect(rank).toBe(expectedRank);
      },
    );
  });
});
