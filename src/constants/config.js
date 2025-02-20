const CONFIG = Object.freeze({
  MIN: Object.freeze({
    LOTTO_NUMBER: 1,
    RANK_COUNT: 3,
  }),
  MAX: Object.freeze({
    LOTTO_NUMBER: 45,
    LOTTO_LENGTH: 6,
  }),
  LOTTO_PRICE: 1000,
  INITIAL_NUMBER: 0,
  RANK_OBJECT_KEY: Object.freeze({
    BONUS: (sameCount) => `${sameCount}개 일치, 보너스 볼 일치`,
    NORMAL: (sameCount) => `${sameCount}개 일치`,
  }),
  SECOND_PRIZE_MATCH_COUNT: 5,
  DECIMAL: 10,
  ANSWER_NO: 'n',
  ANSWER_YES: 'y',
});

export default CONFIG;
