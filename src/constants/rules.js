export const RANDOM_NUMBER_RULE = Object.freeze({
  range: Object.freeze({
    start: 1,
    end: 45,
  }),
});

// TODO: randomNumberRange: { start: 1, end: 45 }로 바로 넣어주면 어떨까?
export const LOTTO_RULE = Object.freeze({
  range: RANDOM_NUMBER_RULE.range,
  matchedCount: 6,
  price: 1_000,
  numbersOfTickets: Object.freeze({
    min: 1,
    max: 20,
  }),
});

// TODO: 사용하지 않는 상수 제거하기
export const BONUS_NUMBER_RULE = Object.freeze({
  rnage: RANDOM_NUMBER_RULE.range,
  length: 1,
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

// TODO: INPUT_MESSAGES.restart의 문자열을 상수화할 때 유용할듯
export const RESTART_KEY = Object.freeze({
  restart: 'y',
  end: 'n',
});
