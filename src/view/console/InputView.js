import Console from './Console';

const InputView = {
  COMMAND: { y: 'RESTART', n: 'EXIT' },

  READ_MONEY: '구입금액을 입력해 주세요.',
  READ_WIN_NUMBERS: '당첨 번호를 입력해 주세요.',
  READ_BONUS_NUMBER: '보너스 번호를 입력해 주세요.',
  READ_RESTART_COMMAND: '다시 시작 하겠습니까? (y/n)',
  ERROR_VALID_COMMAND: `재시작은 y/ 종료는 n을 입력해주세요.`,

  async readMoney() {
    const money = await Console.read(InputView.READ_MONEY);
    return Number(money);
  },

  async readWinNumbers() {
    // to-do: 중간에 띄어쓰기 된 입력값 허용하고 있는데 허용하지 않을지
    const winNumbers = await Console.read(InputView.READ_WIN_NUMBERS);
    const whiteSpaceRegexp = /\s/g;
    return winNumbers.replace(whiteSpaceRegexp, '').split(',').map(Number);
  },

  async readBonusNumber() {
    const bonusNumber = await Console.read(InputView.READ_BONUS_NUMBER);
    return Number(bonusNumber);
  },

  async readRestartCommand() {
    const command = await Console.read(InputView.READ_RESTART_COMMAND);

    InputView.validateCommand(command);

    return command;
  },

  validateCommand(command) {
    if (!InputView.isValidCommand(command)) throw new Error(InputView.ERROR_VALID_COMMAND);
  },

  isValidCommand(command) {
    return Object.hasOwnProperty.call(InputView.COMMAND, command);
  },

  close() {
    Console.close();
  },
};

export default InputView;
