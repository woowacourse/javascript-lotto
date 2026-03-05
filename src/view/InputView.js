import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({
  input: input,
  output: output,
});

const InputView = {
  async inputPrice() {
    const price = await rl.question("구입금액을 입력해 주세요.\n");

    return price;
  },
  async inputWinningNums() {
    const winningNums = await rl.question("\n당첨 번호를 입력해 주세요.\n");

    return winningNums;
  },

  async inputBonusNum() {
    const bonusNum = await rl.question("\n보너스 번호를 입력해 주세요.\n");

    rl.close();
    return bonusNum;
  },
};

export default InputView;
