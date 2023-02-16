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

  printWinningHistory(winnings) {
    Console.print(
      `당첨 통계
--------------------
3개 일치 (5,000원) - ${winnings[0]}개
4개 일치 (50,000원) - ${winnings[1]}개
5개 일치 (1,500,000원) - ${winnings[2]}개
5개 일치, 보너스 볼 일치 (30,000,000원) - ${winnings[3]}개
6개 일치 (2,000,000,000원) - ${winnings[4]}개`
    );
  },

  printEarningsRate(profit) {
    Console.print(`총 수익률은 ${profit}%입니다.`);
  },
};

export default outputView;
