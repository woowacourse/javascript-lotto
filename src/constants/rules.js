export const RANDOM_NUMBER_RULE = Object.freeze({
  range: Object.freeze({
    start: 1,
    end: 45,
  }),
});

export const LOTTO_RULE = Object.freeze({
  range: RANDOM_NUMBER_RULE.range,
  length: 6,
  price: 1_000,
  numbersOfTickets: Object.freeze({
    min: 1,
    max: 50,
  }),
});

export const WINNING_RULE = Object.freeze(
  new Map([
    [5, { matchedCount: 3, isBonus: false, money: 5_000 }],
    [4, { matchedCount: 4, isBonus: false, money: 50_000 }],
    [3, { matchedCount: 5, isBonus: false, money: 1_500_000 }],
    [2, { matchedCount: 5, isBonus: true, money: 30_000_000 }],
    [1, { matchedCount: 6, isBonus: false, money: 2_000_000_000 }],
  ]),
);

export const RESTART_KEY = Object.freeze({
  restart: 'y',
  end: 'n',
});
