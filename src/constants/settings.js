export const SETTINGS = Object.freeze({
  priceUnit: 1_000,
  numberCount: 6,
  numberRange: { min: 1, max: 45 },
  rewards: {
    first: { matchCount: 6, amount: 2_000_000_000 },
    second: { matchCount: 5, bonusMatch: true, amount: 30_000_000 },
    third: { matchCount: 5, bonusMatch: false, amount: 1_500_000 },
    fourth: { matchCount: 4, amount: 50_000 },
    fifth: { matchCount: 3, amount: 5_000 },
  },
});
