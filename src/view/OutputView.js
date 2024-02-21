import MESSAGE from '../constant/Message.js';

const OutputView = {
  print(message) {
    console.log(message);
  },
  printPurchaseCount(count) {
    this.print(`${count}개를 구매했습니다.`);
  },
  printLotto(LottoNumbers) {
    this.print(
      '[' + LottoNumbers.map(number => number.toString()).join(', ') + ']',
    );
  },
  printWinningCharacteristic(winningCounts) {
    this.print();
    this.print(
      winningCounts
        .map((num, i) => `${MESSAGE.winningCharacteristics[i]} - ${num}개`)
        .join('\n'),
    );
  },
  printReturnRate(returnRate) {
    this.print(`총 수익률은 ${returnRate.toFixed(1)}%입니다.`);
  },
};

export default OutputView;
