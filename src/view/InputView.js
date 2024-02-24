import { readLineAsync } from "../utils/console.js";
import Command from "../utils/Command.js";

const MESSAGES = {
  moneyInput: "구입금액을 입력해 주세요.",
  winningLottoNumbersInput: "당첨 번호를 입력해 주세요.",
  bonusLottoNumberInput: "보너스 번호를 입력해 주세요.",
  exitGameInput: `다시 시작하시겠습니까? (${Command.COMMANDS[0]}/${Command.COMMANDS[1]})`,
};

const InputView = {
  async readMoney() {
    return await readLineAsync(MESSAGES.moneyInput);
  },

  async readWinningLottoNumbers() {
    return await readLineAsync(MESSAGES.winningLottoNumbersInput);
  },

  async readBonusLottoNumber() {
    return await readLineAsync(MESSAGES.bonusLottoNumberInput);
  },

  async readIsExitGame() {
    return await readLineAsync(MESSAGES.exitGameInput);
  },
};

export default InputView;
