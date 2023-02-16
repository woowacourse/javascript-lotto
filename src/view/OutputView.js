import Console from '../utils/Console.js';

const OutputView = {
  printPurchaseResult(number) {
    Console.print(`${number}개를 구매했습니다.`);
  },
  printLotto(numbers) {
    Console.print(`[${numbers.join(', ')}]`);
  },
  // eslint-disable-next-line max-lines-per-function
  printResult(rankingResult) {
    Console.print(`
당첨 통계
--------------------
3개 일치 (5,000원) - ${rankingResult[5]}개
4개 일치 (50,000원) - ${rankingResult[4]}개
5개 일치 (1,500,000원) - ${rankingResult[3]}개
5개 일치, 보너스 볼 일치 (30,000,000원) - ${rankingResult[2]}개
6개 일치 (2,000,000,000원) - ${rankingResult[1]}개`);
  },
  printBenefit(benefit) {
    Console.print(`총 수익률은 ${benefit}%입니다.`);
    this.printNewLine();
  },
  printNewLine() {
    Console.print('');
  },
  printError(error) {
    Console.print(error.message);
    this.printNewLine();
  }
};
export default OutputView;
