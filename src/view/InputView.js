import { readLineAsync } from "../utils/console.js";
import COMMANDS from "../constants/commands.js";

const MESSAGES = {
  moneyInput: "구입금액을 입력해 주세요.",
  winningLottoNumbersInput: "당첨 번호를 입력해 주세요.",
  bonusLottoNumberInput: "보너스 번호를 입력해 주세요.",
  exitGameInput: `다시 시작하시겠습니까? (${COMMANDS.true}/${COMMANDS.false})`,
};

const InputView = {
  async readMoney() {
    return await readLineAsync(MESSAGES.moneyInput);
  },

  async readWinningLottoNumbers() {
    return await readLineAsync(MESSAGES.winningLottoNumbersInput);
  },

  async readBonusNumber() {
    return await readLineAsync(MESSAGES.bonusLottoNumberInput);
  },

  async readIsExitGame() {
    return await readLineAsync(MESSAGES.exitGameInput);
  },
};

export default InputView;
