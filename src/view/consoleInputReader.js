import { readLine } from "./utils/readLine.js";

export const consoleInputReader = {
  readPurchaseMoney: () => readLine("구입금액을 입력해 주세요."),
  readWinningNumber: () => readLine("\n당첨 번호를 입력해 주세요."),
  readBonusNumber: () => readLine("\n보너스 번호를 입력해 주세요."),
  readRetry: () => readLine("\n다시 시작하시겠습니까? (y/n)"),
}
