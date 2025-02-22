import LottoPack from "../src/domain/LottoPack";
import generateAnswerLotto from "../src/domain/generateAnswerLotto";
import { MATCH_COUNT } from "../src/constants/constant";

test("사용자가 구매한 로또 번호와 같은 당첨 번호 갯수를 센다.", () => {
  const lottoPack = new LottoPack([[1, 2, 3, 4, 5, 6]]);
  const answerLotto = [1, 2, 3, 4, 5, 6];
  const answerTable = generateAnswerLotto(answerLotto, 7);
  lottoPack.playCompare(answerTable);
  expect(lottoPack.checkCountResult).toEqual({
    [MATCH_COUNT.SIX]: 1,
    [MATCH_COUNT.FIVE_BONUS]: 0,
    [MATCH_COUNT.FIVE]: 0,
    [MATCH_COUNT.FOUR]: 0,
    [MATCH_COUNT.THREE]: 0,
  });
});
