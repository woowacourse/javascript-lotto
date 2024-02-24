import MESSAGE from '../constant/Message';

const OutputView = {
  print(message) {
    console.log(message);
  },

  printPurchaseCount(count) {
    this.print(`${count}개를 구매했습니다.`);
  },

  printLotto(LottoNumbers) {
    this.print(`[${LottoNumbers.join(', ')}]`);
  },

  printWinningCharacteristic(winningResult) {
    this.print('');
    this.print(MESSAGE.winningCharacteristicsHeader);
    this.print(MESSAGE.lineSplitter);
    this.print(
      Object.entries(winningResult)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([matched, count]) => `${MESSAGE.winningCharacteristics[matched]} - ${count}개`)
        .join('\n'),
    );
  },

  printReturnRate(returnRate) {
    this.print(`총 수익률은 ${returnRate.toFixed(1)}%입니다.`);
  },
};

export default OutputView;
