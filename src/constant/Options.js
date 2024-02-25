const OPTIONS = {
  INPUT: {
    winningNumbersDelimiter: ','
  },

  LOTTO: {
    price: 1000,
    minNumber: 1,
    maxNumber: 45,
    combination: 6
  },

  RANK: [1, 2, 3, 4, 5, 6],

  RANK_CONDITION: {
    1: { matchingCount: 6 },
    2: { matchingCount: 5, bonusMatch: true },
    3: { matchingCount: 5, bonusMatch: false },
    4: { matchingCount: 4 },
    5: { matchingCount: 3 },
    6: {}
  },

  PRIZE_BY_RANK: {
    1: 2_000_000_000,
    2: 30_000_000,
    3: 1_500_000,
    4: 50_000,
    5: 5_000,
    6: 0
  },

  WINNING_RESULT: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  }
};

export default OPTIONS;
