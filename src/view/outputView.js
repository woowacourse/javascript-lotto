import Console from '../utils/Console.js';

const outputView = {
  printCountLotto(number) {
    Console.print(`${number}개를 구매하셨습니다.`);
  },

  printLottoNumber(lottos) {
    lottos.forEach(lotto => {
      Console.print(lotto);
    });
  },
};

export default outputView;
