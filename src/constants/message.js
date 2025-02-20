const ERROR = Object.freeze({
  NORMALIZATION: (message) => `[ERROR] ${message}`,
  MONEY: {
    EMPTY_VALUE: '로또 구입 금액은 0원 이하일수 없다.',
    REST_VALUE: '로또 구입 금액은 1,000원으로 나눠떨어져야 한다.',
  },
  LOTTO_NUMBER: {
    QUANTITY: '로또 번호는 6자리여야 한다.',
    RANGE: '로또 번호의 숫자 범위 1 ~ 45이다.',
    DUPLICATION: '로또 번호의 숫자는 중복될 수 없다.',
  },
  BONUS: {
    RANGE: '보너스 번호의 숫자 범위 1 ~ 45이다.',
    DUPLICATION: '보너스 번호는 당첨 로또의 있는 숫자와 중복되면 안된다.',
  },
});

const OUTPUT_MESSAGE = Object.freeze({
  LOTTO_QUANTITY: (quantity) => `${quantity}개를 구매했습니다.`,
  SINGLE_LOTTO: (lotto) => `[${lotto.join(', ')}]`,
  RANK_RESULT: (name, { count, price }) => `${name} (${(price).toLocaleString()}원) - ${count}개`,
  RANK_RESULT_HEADLINE: '\n당첨 통계\n--------------------',
  REVENUE_RATE: (revenueRate) => `총 수익률은 ${revenueRate}%입니다.`,
});

export {
  ERROR, OUTPUT_MESSAGE,
};
