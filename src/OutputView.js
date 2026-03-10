import { RANK_RULES } from './constants/rank.js';

class OutputView {
  printLottoResult(ranks, rate) {
    const rankOutput = RANK_RULES.map((rule) => (
      `${rule.matchCount}개 일치 (${rule.prize.toLocaleString()}원) - ${ranks[rule.rank]}개`),
    );

    const output = ['당첨 통계',
      '--------------------',
      rankOutput.join('\n'),
      `총 수익률은 ${rate.toFixed(1)}%입니다.`];

    console.log(output.join('\n'));
  }

  printLottos(lottos) {
    const output = `${lottos.length}개를 구매했습니다.
${lottos.map((lotto) => `[${lotto.parseNumbers().join(', ')}]`).join('\n')}
`;
    console.log(output);
  }
}

export default OutputView;
