const OPTIONS = {
  LOTTO: {
    price: 1000,
    minNumber: 1,
    maxNumber: 45,
    combination: 6
  },

  RANK_CONDITION: {
    1: { matchingCount: 6 },
    2: { matchingCount: 5, bonusMatch: true },
    3: { matchingCount: 5, bonusMatch: false },
    4: { matchingCount: 4 },
    5: { matchingCount: 3 }
  },

  PRIZE_BY_RANK: {
    1: 2_000_000_000,
    2: 30_000_000,
    3: 1_500_000,
    4: 50_000,
    5: 5_000
  }
};

export default OPTIONS;

// 1등: 6개 번호 일치 / 2,000,000,000원
// 2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
// 3등: 5개 번호 일치 / 1,500,000원
// 4등: 4개 번호 일치 / 50,000원
// 5등: 3개 번호 일치 / 5,000원
