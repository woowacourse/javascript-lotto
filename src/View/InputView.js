import readLine from 'readline';

const COMMON_MESSAGES = Object.freeze({
  MONEY: '\n> 구입금액을 입력해 주세요.',
  WIN_LOTTO: '\n> 당첨 번호를 입력해주세요.',
  BONUS_NUMBER: '\n> 보너스 번호를 입력해주세요.',
  RE_RUN: '\n> 다시 시작하시겠습니까? (y/n)',
});

const RETRY_INPUT = Object.freeze(['y', 'Y']);
const NO_RETRY_INPUT = Object.freeze(['n', 'N']);
const DIVIDED_SYMBOL = ',';

const ERROR_MESSAGES = Object.freeze({
  NO_INPUT: '입력 값을 적어주세요.',
  INVALID_RETRY_INPUT: `${RETRY_INPUT.join(',')}, ${NO_RETRY_INPUT.join(',')}을 입력해주세요.`,
});

const stdObj = Object.freeze({
  input: process.stdin,
  output: process.stdout,
});

const InputView = {
  async readMoney() {
    const moneyInput = await this.readLineAsync(COMMON_MESSAGES.MONEY);
    this.validInput(moneyInput);
    return Number(moneyInput);
  },

  async readWinLottoNumbers() {
    const winLottoInput = await this.readLineAsync(COMMON_MESSAGES.WIN_LOTTO);
    this.validInput(winLottoInput);
    return winLottoInput.split(DIVIDED_SYMBOL).map(Number);
  },

  async readBonusNumber() {
    const bonusNumberInput = await this.readLineAsync(COMMON_MESSAGES.BONUS_NUMBER);
    this.validInput(bonusNumberInput);

    return Number(bonusNumberInput);
  },

  async validInput(input) {
    if (!input) throw new Error(ERROR_MESSAGES.NO_INPUT);
  },

  async readIsRetryRun() {
    const retryInput = await this.readLineAsync(COMMON_MESSAGES.RE_RUN);

    if (RETRY_INPUT.includes(retryInput)) return true;
    if (NO_RETRY_INPUT.includes(retryInput)) return false;
    throw new Error(ERROR_MESSAGES.INVALID_RETRY_INPUT);
  },

  async readLineAsync(message) {
    return new Promise((resolve) => {
      const rl = readLine.createInterface(stdObj);

      rl.question(message, (input) => {
        resolve(input);
        rl.close();
      });
    });
  },
};

export default InputView;
