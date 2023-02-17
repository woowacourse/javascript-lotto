import { LOTTO_PRIZE_MONEY, PRIZE_MATCH_COUNT } from '../constants/condition.js';

const OutputView = {
  printErrorMessage(message) {
    console.log(message);
  },

  printLottoQuantity(lottoQuantity) {
    console.log(`${lottoQuantity}개를 구매했습니다.`);
  },

  printEachLottoNumbers(eachLottoNumbers) {
    eachLottoNumbers.forEach((lottoNumbers) => {
      const numbersTemplate = lottoNumbers.join(', ');
      const template = `[${numbersTemplate}]`;

      console.log(template);
    });
  },

  printStatistics(statistics) {
    const templates = Object.entries(statistics).map(([prize, count]) => {
      if (prize === 'secondPrize') {
        return (
          `${PRIZE_MATCH_COUNT[prize]}개 일치, 보너스 볼 일치 ` +
          `(${LOTTO_PRIZE_MONEY[prize].toLocaleString()}원) - ${count}개`
        );
      }

      return (
        `${PRIZE_MATCH_COUNT[prize]}개 일치` +
        `(${LOTTO_PRIZE_MONEY[prize].toLocaleString()}원) - ${count}개`
      );
    });

    console.log(templates.join('\n'));
  },

  printYieldRatio(yieldRatio) {
    console.log(`총 수익률은 ${yieldRatio.toLocaleString(new Intl.NumberFormat('KRW'))}% 입니다.`);
  },
};

export default OutputView;
