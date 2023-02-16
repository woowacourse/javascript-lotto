import Console from '../utils/Console.js';

const inputView = {
  async readMoney() {
    const money = await Console.readLine('구입금액을 입력해 주세요.');
    return money;
  },

  async readWinningNumber() {
    return await Console.readLine('\n> 당첨 번호를 입력해 주세요. ');
  },

  async readBonusNumber() {
    return await Console.readLine('\n> 보너스 번호를 입력해 주세요. ');
  },

  async readRestartOrFinish() {
    if(await Console.readLine('\n> 다시 시작하시겠습니까? (y/n) ')==='y') return 1;
    Console.close()
  },
};

export default inputView;
