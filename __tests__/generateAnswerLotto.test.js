import { BONUS, WINNING } from "../src/constants/constant";
import generateAnswerLotto from "../src/domain/generateAnswerLotto";

describe("generateAnswerLotto 도메인 테스트", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;

  test("generateAnswerLotto는 객체(해시테이블)를 반환한다.", () => {
    const answerLotto = generateAnswerLotto(winningNumbers, bonusNumber);

    expect(typeof answerLotto).toBe("object");
  });

  test("당첨 번호가 WINNING 값으로 저장되어야 한다.", () => {
    const answerLotto = generateAnswerLotto(winningNumbers, bonusNumber);

    winningNumbers.forEach((num) => {
      expect(answerLotto[num]).toBe(WINNING);
    });
  });

  test("보너스 번호가 BONUS 값으로 저장되어야 한다.", () => {
    const answerLotto = generateAnswerLotto(winningNumbers, bonusNumber);

    expect(answerLotto[bonusNumber]).toBe(BONUS);
  });
});
