import LottoPack from "../src/domain/LottoPack";
import generateAnswerLotto from "../src/domain/generateAnswerLotto";

test("사용자가 구매한 로또 번호와 같은 당첨 번호 갯수를 센다.", () => {
  const lottoPack = new LottoPack([[1, 2, 3, 4, 5, 6]]);
  const answerLotto = [1, 2, 3, 4, 5, 6];
  const answerTable = generateAnswerLotto(answerLotto, 7);
  lottoPack.playCompare(answerTable);
  expect(lottoPack.checkCountResult).toEqual({
    6: 1,
    "5+1": 0,
    5: 0,
    4: 0,
    3: 0,
  });
});
