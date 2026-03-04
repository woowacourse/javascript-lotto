import { readLine } from "../utils/readLine.js";

export const InputView = {
  async inputPurchaseAmount() {
    const answer = await readLine("구입금액을 입력해 주세요.");
    return answer;
  },

  async inputWinningNumber() {
    const answer = await readLine("당첨 번호를 입력해 주세요.");
    return answer;
  },

  async inputBonusNumber() {
    const answer = await readLine("보너스 번호를 입력해 주세요.");
    return answer;
  },

  async inputRetry() {
    const answer = await readLine("다시 시작하시겠습니까? (y/n)");
    return answer;
  },
};
