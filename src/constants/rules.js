export const RANDOM_NUMBER_RULE = Object.freeze({
  range: Object.freeze({
    start: 1,
    end: 45,
  }),
});

export const LOTTO_RULE = Object.freeze({
  range: RANDOM_NUMBER_RULE.range,
  count: 6,
  price: 1_000,
});

export const BONUS_NUMBER_RULE = Object.freeze({
  rnage: RANDOM_NUMBER_RULE.range,
  length: 1,
});
// TODO 로또 당첨 정보 상수 (Map 이용)
