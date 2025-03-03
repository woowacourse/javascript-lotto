const CONFIG = Object.freeze({
  LOTTO: Object.freeze({
    PRICE: Object.freeze({
      MIN: 1000,
      MAX: 100000,
    }),
    LENGTH: 6,
    NUMBER: Object.freeze({
      MIN: 1,
      MAX: 45,
    }),
  }),
  RANK: Object.freeze({
    MIN_COUNT: 3,
    SECOND_PRIZE_MATCH_COUNT: 5,
    OBJECT_KEY: Object.freeze({
      BONUS: (sameCount) => `${sameCount}개 일치, 보너스 볼 일치`,
      NORMAL: (sameCount) => `${sameCount}개 일치`,
    }),

  }),
  INITIAL_MONEY: 0,
  INITIAL_PROFIT: 0,
  DECIMAL: 10,
  ANSWER: Object.freeze({
    YES: 'y',
    NO: 'n',
  }),
  NEW_LINE: '\n',
});

export default CONFIG;
