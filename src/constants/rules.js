export const RANDOM_NUMBER_RULE = Object.freeze({
  range: Object.freeze({
    start: 1,
    end: 45,
  }),
});

export const LOTTO_RULE = Object.freeze({
  range: RANDOM_NUMBER_RULE.range,
  matchedCount: 6,
  price: 1_000,
  numbersOfTickets: Object.freeze({
    min: 1,
    max: 20,
  }),
});

export const BONUS_NUMBER_RULE = Object.freeze({
  rnage: RANDOM_NUMBER_RULE.range,
  length: 1,
});
// TODO 로또 당첨 정보 상수 (Map 이용)

/*
1등: 6개 번호 일치 / 2,000,000,000원
2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
3등: 5개 번호 일치 / 1,500,000원
4등: 4개 번호 일치 / 50,000원
5등: 3개 번호 일치 / 5,000원
*/
export const WINNING_RULE = Object.freeze(
  new Map([
    [5, { matchedCount: 3, isBonus: false, money: 5_000 }],
    [4, { matchedCount: 4, isBonus: false, money: 50_000 }],
    [3, { matchedCount: 5, isBonus: false, money: 1_500_000 }],
    [2, { matchedCount: 5, isBonus: true, money: 30_000_000 }],
    [1, { matchedCount: 6, isBonus: false, money: 2_000_000_000 }],
  ]),
);
