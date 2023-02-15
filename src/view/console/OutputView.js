import Console from './Console';

const OutputView = {
  // winCondition, winMoney, winCount는 상수화(맵)되어야 하며,
  // OutputView 바깥에서 받아야함.
  winCondition: {
    1: '6개 일치',
    2: '5개 일치, 보너스 볼 일치',
    3: '5개 일치',
    4: '4개 일치',
    5: '3개 일치',
  },
  winMoney: { 1: 2000000000, 2: 30000000, 3: 1500000, 4: 50000, 5: 5000 },
  // to-do : 메서드명 나중에 변경하기
  printBuyLottos(lottos) {
    Console.print(`${lottos.length}개를 구매했습니다.`);
    lottos.forEach((lotto) => {
      Console.print(`[${lotto.join(', ')}]`);
    });
  },

  printWinTitle() {
    Console.print('당첨 통계');
    Console.print('--------------------');
  },

  printWinStatistics(prizes) {
    const winCount = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    prizes.forEach((prize) => (winCount[prize] += 1));
    // to-do: 변수명, Array.from을 의존성을 버리고, 외부에서 등수별로 조합할 수 있도록
    const results = Array.from({ length: 5 }, (_, i) => {
      return `${winCount[i + 1]} ${this.winCondition[i + 1]} ${this.winMoney[i + 1]}`;
    });

    results.forEach((result) => Console.print(result));
  },

  printProfitRate(winStatistics) {
    const { buyMoney } = winStatistics;
    const totalWinMoney = Array.from(
      { length: 5 },
      (_, i) => this.winCount[i + 1] * this.winMoney[i + 1],
    ).reduce((total, current) => total + current, 0);
    const profitRate = (totalWinMoney / buyMoney) * 100;

    Console.print(profitRate.toFixed(2));
  },

  printEmptyLine() {
    Console.print('');
  },
};

export default OutputView;
