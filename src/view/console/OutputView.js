import Console from './Console';

const OutputView = {
  WIN_TITLE: '당첨 통계\n--------------------',
  WIN_CONDITION: {
    1: '6개 일치',
    2: '5개 일치, 보너스 볼 일치',
    3: '5개 일치',
    4: '4개 일치',
    5: '3개 일치',
  },

  generateNumbersMessage(lotto) {
    return `[${lotto.join(', ')}]`;
  },

  generateBuyAmountMessage(amount) {
    return `${amount}개를 구매했습니다.`;
  },

  generateProfitRateMessage(profitRate) {
    return `총 수익률은 ${profitRate.toFixed(2)}%입니다.`;
  },
  // to-do : 메서드명 나중에 변경하기
  printBuyLottos(lottos) {
    Console.print(this.generateBuyAmountMessage(lottos.length));
    lottos.forEach((lotto) => {
      Console.print(OutputView.generateNumbersMessage(lotto));
    });
  },

  printWinTitle() {
    Console.print(OutputView.WIN_TITLE);
  },

  generateWinPrizeMoneyMessage(winPrizeMoney, rank) {
    return `(${winPrizeMoney[rank].toLocaleString('ko-KR')}원)`;
  },

  generateWinCountMessage(winCount, rank) {
    return `${winCount[rank]}개`;
  },

  printWinStatistics({ winCount, winPrizeMoney, profitRate }) {
    this.printWinTitle();
    const rankLength = 5;
    const results = Array.from({ length: rankLength }, (_, i) => {
      return `${this.WIN_CONDITION[rankLength - i]} ${this.generateWinPrizeMoneyMessage(
        winPrizeMoney,
        rankLength - i,
      )} - ${this.generateWinCountMessage(winCount, rankLength - i)}`;
    });
    results.forEach((result) => Console.print(result));
    this.printProfitRate(profitRate);
  },

  printProfitRate(profitRate) {
    Console.print(this.generateProfitRateMessage(profitRate));
  },

  printErrorMsg(message) {
    console.error(`[ERROR]:${message}`);
  },
};

export default OutputView;
