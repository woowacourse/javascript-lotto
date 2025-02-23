const LOTTO_RULE = Object.freeze({
  MIN_RANGE: 1,
  MAX_RANGE: 45,
  LENGTH: 6,
  PRICE: 1000,
});

const RANK_RULE = Object.freeze({
  MIN_COUNT: 3,
  SECOND_PRIZE_MATCH_COUNT: 5,
});

const INITIAL_NUMBER = 0;
const ONE_TICKET = 1;

export { INITIAL_NUMBER, LOTTO_RULE, RANK_RULE, ONE_TICKET };
