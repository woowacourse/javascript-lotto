import LottoPack from "../src/domain/LottoPack";
import AnswerLottoPack from "../src/domain/AnswerLottoPack";
import compareMachine from "../src/domain/compareMachine";
test("사용자가 구매한 로또 번호와 같은 당첨 번호 갯수를 센다.", () => {
  const lottoPack = new LottoPack([[1, 2, 3, 4, 5, 6]]);
  const answerLotto = [1, 2, 3, 4, 5, 6];
  const answerLottoPack = new AnswerLottoPack(answerLotto, 7);
  const winningResult = compareMachine(lottoPack, answerLottoPack);
  expect(winningResult).toEqual({
    6: 1,
    "5+1": 0,
    5: 0,
    4: 0,
    3: 0,
  });
});
