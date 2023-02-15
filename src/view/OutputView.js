import Console from '../utils/Console.js';

const OutputView = {
  printPurchaseResult(number) {
    Console.print(`${number}개를 구매했습니다.`);
  },
  printLotto(numbers) {
    Console.print(numbers);
  },
  // eslint-disable-next-line max-lines-per-function
  printResult() {
    Console.print(`
당첨 통계
--------------------
3개 일치 (5,000원) - 1개
4개 일치 (50,000원) - 0개
5개 일치 (1,500,000원) - 0개
5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
6개 일치 (2,000,000,000원) - 0개
총 수익률은 62.5%입니다.
`);
  },
  printNewLine() {
    Console.print('');
  }
};
export default OutputView;
