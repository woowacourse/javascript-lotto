const LOTTO_CONDITION = {
  lottoPrice: 1000,
  lottoNumberMinRange: 1,
  lottoNumberMaxRange: 45,
  lottoDigits: 6,
};

const PRIZE_MATCH_COUNT = Object.freeze({
  firstPrize: 6,
  secondPrize: 5,
  thirdPrize: 5,
  fourthPrize: 4,
  fifthPrize: 3,
});

const LOTTO_PRIZE_MONEY = Object.freeze({
  firstPrize: 2_000_000_000,
  secondPrize: 30_000_000,
  thirdPrize: 1_500_000,
  fourthPrize: 50_000,
  fifthPrize: 5_000,
});

export { LOTTO_CONDITION, PRIZE_MATCH_COUNT, LOTTO_PRIZE_MONEY };
