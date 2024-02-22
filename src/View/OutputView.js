const DIVIDED_SYMBOL = ', ';

const COUNT_UNIT = '개';

const MESSAGE = Object.freeze({
  BUYING: `${COUNT_UNIT}를 구매했습니다.`,
});

const RANK_TO_COUNT = {
  1: 6,
  2: 5,
  3: 5,
  4: 4,
  5: 3,
};

const RANK_TO_PRIZE_MONEY_STRINGS = {
  1: '2,000,000,000원',
  2: '30,000,000원',
  3: '1,500,000원',
  4: '50,000원',
  5: '5,000원',
};

const RANK_TO_MESSAGE = {
  1: `${COUNT_UNIT} 일치`,
  2: `${COUNT_UNIT} 일치, 보너스 볼 일치`,
  3: `${COUNT_UNIT} 일치`,
  4: `${COUNT_UNIT} 일치`,
  5: `${COUNT_UNIT} 일치`,
};

const COMMON_MESSAGES = {
  RESULT_HEADER: '\n당첨 통계\n--------------------',
};

const OutputView = {
  printBoughtLottos(boughtLottos) {
    this.printLottoLength(boughtLottos.length);
    boughtLottos.forEach((lotto) => this.printMessage(`[${lotto.getLottoNumbers().join(DIVIDED_SYMBOL)}]`));
  },

  printLottoLength(lottoCount) {
    this.printMessage(`${lottoCount}${MESSAGE.BUYING}`);
  },

  printWinLottos(winLottos) {
    this.printMessage(COMMON_MESSAGES.RESULT_HEADER);
    const NUMBER_OF_RANK_TYPE = 5;
    for (let rank = NUMBER_OF_RANK_TYPE; rank > 0; rank -= 1) {
      const rankMessage = RANK_TO_MESSAGE[rank];
      const message = `${RANK_TO_COUNT[rank]}${rankMessage} (${RANK_TO_PRIZE_MONEY_STRINGS[rank]}) - ${winLottos[rank]}${COUNT_UNIT}`;
      this.printMessage(message);
    }
  },

  printRateOfIncome(income) {
    const RATE_OF_INCOME_MESSAGE = (rate) => `총 수익률은 ${rate.toLocaleString()}% 입니다.`;
    this.printMessage(RATE_OF_INCOME_MESSAGE(income));
  },

  printError(message) {
    const ERROR_MESSAGE_PREFIX = '❌';
    this.printMessage(`${ERROR_MESSAGE_PREFIX} ${message}`);
  },

  printMessage(message) {
    console.log(message);
  },
};

export default OutputView;
