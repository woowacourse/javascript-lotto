export const LOTTO_REWARDS = Object.freeze({
  first: 2_000_000_000,
  second: 30_000_000,
  third: 1_500_000,
  fourth: 50_000,
  fifth: 5_000,
  nothing: 0,
});

export const LOTTO_RANK_CONDITION = Object.freeze({
  first: { matchedCount: 6, useBonusNumber: false },
  second: { matchedCount: 5, useBonusNumber: true },
  third: { matchedCount: 5, useBonusNumber: false },
  fourth: { matchedCount: 4, useBonusNumber: false },
  fifth: { matchedCount: 3, useBonusNumber: false },
});

export const exchangeRank = ({ matchedCount, hasBonusNumber }) => {
  switch (true) {
    case matchedCount === 6:
      return "first";
    case matchedCount === 5 && hasBonusNumber:
      return "second";
    case matchedCount === 5:
      return "third";
    case matchedCount === 4:
      return "fourth";
    case matchedCount === 3:
      return "fifth";
    default:
      return "nothing";
  }
};

export const LOTTO_RULES = Object.freeze({
  price: 1000,
  maxQuantity: 100,
  length: 6,
  minNumber: 1,
  maxNumber: 45,
  exchangeRank: exchangeRank,
});
