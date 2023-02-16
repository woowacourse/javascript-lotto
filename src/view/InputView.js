import readLine from '../utils/readLine.js';

const InputView = {
  readPurchaseMoney() {
    return new Promise((resolve) => {
      readLine.question('구입 금액을 입력 해 주세요.', (userInput) => {
        resolve(userInput);
      });
    });
  },

  readWinningLottoNumbers() {
    return new Promise((resolve) => {
      readLine.question('\n당첨 번호를 입력해 주세요.', (userInput) => {
        resolve(userInput);
      });
    });
  },

  readBonusLottoNumber() {
    return new Promise((resolve) => {
      readLine.question('보너스 번호를 입력해 주세요.', (userInput) => {
        resolve(userInput);
      });
    });
  },

  readRetryCommand() {
    return new Promise((resolve) => {
      readLine.question('\n다시 시작하시겠습니까? (y/n)', (userInput) => {
        resolve(userInput);
      });
    });
  },
};

export default InputView;
