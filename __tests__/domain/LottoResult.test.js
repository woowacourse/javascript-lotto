/* eslint-disable max-lines-per-function */ import Lotto from "../../src/domain/Lotto.js";
import LottoResult from "../../src/domain/LottoResult.js";
import WinningLotto from "../../src/domain/WinningLotto.js";

describe("LottoResult 객체 테스트", () => {
  let WINNING_LOTTO;

  beforeEach(() => {
    const WINNING_LOTTO_NO_BONUS_NUMBER = new Lotto([1, 2, 3, 4, 5, 6]);
    WINNING_LOTTO = new WinningLotto(WINNING_LOTTO_NO_BONUS_NUMBER, 7);
  });

  const hasBonusNumberWhatever = "상관없이";

  test.each([
    {
      lottoNumbers: [1, 2, 3, 4, 5, 6],
      matchCount: 6,
      expectedRank: "1등",
      hasBonusNumber: hasBonusNumberWhatever,
      expectedResults: {
        NONE_PLACE: 0,
        FIFTH_PLACE: 0,
        FOURTH_PLACE: 0,
        THIRD_PLACE: 0,
        SECOND_PLACE: 0,
        FIRST_PLACE: 1,
      },
    },
    {
      lottoNumbers: [1, 2, 3, 4, 5, 7],
      matchCount: 5,
      hasBonusNumber: true,
      expectedRank: "2등",
      expectedResults: {
        NONE_PLACE: 0,
        FIFTH_PLACE: 0,
        FOURTH_PLACE: 0,
        THIRD_PLACE: 0,
        SECOND_PLACE: 1,
        FIRST_PLACE: 0,
      },
    },
    {
      lottoNumbers: [1, 2, 3, 4, 5, 8],
      matchCount: 5,
      hasBonusNumber: hasBonusNumberWhatever,
      expectedRank: "3등",
      expectedResults: {
        NONE_PLACE: 0,
        FIFTH_PLACE: 0,
        FOURTH_PLACE: 0,
        THIRD_PLACE: 1,
        SECOND_PLACE: 0,
        FIRST_PLACE: 0,
      },
    },
    {
      lottoNumbers: [1, 2, 3, 4, 8, 9],
      matchCount: 4,
      hasBonusNumber: hasBonusNumberWhatever,
      expectedRank: "4등",
      expectedResults: {
        NONE_PLACE: 0,
        FIFTH_PLACE: 0,
        FOURTH_PLACE: 1,
        THIRD_PLACE: 0,
        SECOND_PLACE: 0,
        FIRST_PLACE: 0,
      },
    },
    {
      lottoNumbers: [1, 2, 3, 8, 9, 10],
      matchCount: 3,
      hasBonusNumber: hasBonusNumberWhatever,
      expectedRank: "5등",
      expectedResults: {
        NONE_PLACE: 0,
        FIFTH_PLACE: 1,
        FOURTH_PLACE: 0,
        THIRD_PLACE: 0,
        SECOND_PLACE: 0,
        FIRST_PLACE: 0,
      },
    },
    {
      lottoNumbers: [1, 8, 9, 10, 11, 12],
      matchCount: 1,
      hasBonusNumber: hasBonusNumberWhatever,
      expectedRank: "꽝",
      expectedResults: {
        NONE_PLACE: 0,
        FIFTH_PLACE: 0,
        FOURTH_PLACE: 0,
        THIRD_PLACE: 0,
        SECOND_PLACE: 0,
        FIRST_PLACE: 0,
      },
    },
    {
      lottoNumbers: [1, 8, 9, 10, 11, 12],
      matchCount: 0,
      hasBonusNumber: hasBonusNumberWhatever,
      expectedRank: "꽝",
      expectedResults: {
        NONE_PLACE: 0,
        FIFTH_PLACE: 0,
        FOURTH_PLACE: 0,
        THIRD_PLACE: 0,
        SECOND_PLACE: 0,
        FIRST_PLACE: 0,
      },
    },
  ])(
    "로또 번호가 당첨번호와 $matchCount개 일치하고 보너스 번호 일치 여부는 $hasBonusNumber,$expectedRank 이다",
    ({ lottoNumbers, expectedResults }) => {
      const lotto = new Lotto(lottoNumbers);
      const lottoList = [lotto];

      const lottoResult = new LottoResult(
        lottoList,
        WINNING_LOTTO,
      ).getTotalResult();
      console.log({ lottoResult });

      expect(lottoResult).toEqual(expectedResults);
    },
  );

  test("구매한 로또의 수익률을 계산한다.", () => {
    const WINNING_LOTTO_NUMBERS = [1, 2, 3, 4, 5, 6];
    const WINNING_LOTTO = new Lotto(WINNING_LOTTO_NUMBERS);
    const WINNING_LOTTO_WITH_BONUS_NUMBER = new WinningLotto(WINNING_LOTTO, 7);
    const LOTTO_LIST = [new Lotto([1, 2, 3, 11, 12, 13])];

    const profitResult = new LottoResult(
      LOTTO_LIST,
      WINNING_LOTTO_WITH_BONUS_NUMBER,
    ).getProfit(LOTTO_LIST.length * 1000);

    expect(profitResult).toBe(500);
  });
});
