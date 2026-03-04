import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({
  input: input,
  output: output,
});

export async function inputPrice() {
  const price = await rl.question("구입금액을 입력해 주세요.\n");

  rl.close();
  return price;
}

export async function inputWinningNums() {
  const winningNums = await rl.question("당첨 번호를 입력해 주세요.\n");

  rl.close();
  return winningNums;
}

export async function inputBonusNum() {
  const bonusNum = await rl.question("보너스 번호를 입력해 주세요.\n");

  rl.close();
  return bonusNum;
}
