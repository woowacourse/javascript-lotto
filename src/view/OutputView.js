import Console from '../util/Console.js';
import { BOUNDARY_LEFT, BOUNDARY_RIGHT } from '../util/constants/constants.js';

const OutputView = {
  printLottos(lottos) {
    Console.print(this.getLottoMessage(lottos));
    Console.print(`${lottos.length}개를 구매했습니다.\n`);
  },

  printResult(resultBoard) {
    Console.print(this.getResultMessage(resultBoard));
  },

  print(message) {
    Console.print(message);
  },

  getLottoMessage(lottos) {
    return lottos.reduce(
      (message, lottoNumbers) =>
        `${message}${BOUNDARY_LEFT}${[...lottoNumbers].join(', ')}${BOUNDARY_RIGHT}\n`,
      ''
    );
  },

  getResultMessage({ first, second, third, fourth, fifth, lottoYield }) {
    return `당첨 통계
--------------------
3개 일치 (${fifth.getPrize().toLocaleString('ko-kr')}원) - ${fifth.getCount()}개
4개 일치 (${fourth.getPrize().toLocaleString('ko-kr')}원) - ${fourth.getCount()}개
5개 일치 (${third.getPrize().toLocaleString('ko-kr')}원) - ${third.getCount()}개
5개 일치, 보너스 볼 일치 (${second.getPrize().toLocaleString('ko-kr')}원) - ${second.getCount()}개
6개 일치 (${first.getPrize().toLocaleString('ko-kr')}원) - ${first.getCount()}개
총 수익률은 ${lottoYield.toFixed(1).toLocaleString('ko-kr')}%입니다.`;
  },

  close() {
    Console.close();
  },
};

export default OutputView;
