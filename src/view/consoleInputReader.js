import { readLine } from "../utils/readLine.js";

export const consoleInputReader = {
  determinePurchaseMoney: () => readLine("구입금액을 입력해 주세요."),
  determineWinningNumber: () => readLine("\n당첨 번호를 입력해 주세요."),
  determineBonusNumber: () => readLine("\n보너스 번호를 입력해 주세요."),
  determineRetry: () => readLine("\n다시 시작하시겠습니까? (y/n)"),
}
