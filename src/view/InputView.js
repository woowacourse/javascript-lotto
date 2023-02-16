import readLine from '../utils/readLine.js';

const InputView = {
  readPurchaseMoney() {
    return new Promise((resolve) => {
      readLine.question('구입 금액을 입력 해 주세요.', (userInput) => {
        resolve(userInput);
      });
    });
  },

  readTryCount() {
    return new Promise((resolve) => {
      readLine.question(INPUT_MESSAGE.ENTER_TRY_COUNT, (userInput) => {
        resolve(userInput);
      });
    });
  },

  check: async () => {
    return await readLine.question('구입 금액을 확인 해 주세요', (userInput) => userInput);
  },
};

export default InputView;
