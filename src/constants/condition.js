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
  firstPrize: 2000000000,
  secondPrize: 30000000,
  thirdPrize: 1500000,
  fourthPrize: 50000,
  fifthPrize: 5000,
});

const RESTART_COMMAND = Object.freeze({
  restart: 'y',
  quit: 'n',
});

export { LOTTO_CONDITION, PRIZE_MATCH_COUNT, LOTTO_PRIZE_MONEY, RESTART_COMMAND };
