import Console from '../utils/Console.js';

const inputView = {
  readMoney() {
    Console.readLine('구입금액을 입력해 주세요.', input => {
      Console.print(input);
    });
  },
};

export default inputView;
