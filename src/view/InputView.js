import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import Validator from "../utils/Validator.js";

const rl = readline.createInterface({
  input: input,
  output: output,
});

const InputView = {
  async inputPrice() {
    const priceStr = await rl.question("> 구입금액을 입력해 주세요.\n");
    const price = Number(priceStr);
    Validator.validateNumber(price);
    Validator.validatePrice(price);

    return price;
  },

  async inputWinningNums() {
    const winningNumsStr = await rl.question(
      "\n> 당첨 번호를 입력해 주세요.\n",
    );
    const winningNums = winningNumsStr.split(",").map(Number);

    winningNums.forEach((num) => Validator.validateNumber(num));
    Validator.validateLottoCount(winningNums);
    winningNums.forEach((num) => Validator.validateLottoNumRange(num));
    Validator.validateDuplicateLottoNums(winningNums);

    return winningNums;
  },

  async inputBonusNum(winningNums) {
    const bonusNumStr = await rl.question("\n> 보너스 번호를 입력해 주세요.\n");
    const bonusNum = Number(bonusNumStr);

    Validator.validateNumber(bonusNum);
    Validator.validateLottoNumRange(bonusNum);
    Validator.validateDuplicateBonusNum(winningNums, bonusNum);

    return bonusNum;
  },

  async inputRestartAnswer() {
    const restartAnswer = await rl.question(
      "\n> 다시 시작하시겠습니까? (y/n) \n",
    );
    Validator.validateRestartAnswer(restartAnswer);

    return restartAnswer;
  },

  close() {
    rl.close();
  },
};

export default InputView;
