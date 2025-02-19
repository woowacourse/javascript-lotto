import AnswerLottoPack from "../src/domain/AnswerLottoPack";

test("당첨 번호와 보너스 번호를 관리한다.", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;
  const answerLottoPack = new AnswerLottoPack(winningNumbers, bonusNumber);

  expect(answerLottoPack.answerTable).toEqual({
    1: "당첨 번호",
    2: "당첨 번호",
    3: "당첨 번호",
    4: "당첨 번호",
    5: "당첨 번호",
    6: "당첨 번호",
    7: "보너스 번호",
  });
});
