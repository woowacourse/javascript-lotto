import { BONUS, WINNING } from "../constants/constant.js";

const generateAnswerLotto = (winningNumbers, bonusNumber) => {
  const answerLotto = {};

  winningNumbers.forEach((number) => {
    answerLotto[number] = WINNING;
  });
  answerLotto[bonusNumber] = BONUS;

  return answerLotto;
};

export default generateAnswerLotto;
