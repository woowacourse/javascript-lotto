export const RANKINGS = {
  RANKING1: "RANKING1",
  RANKING2: "RANKING2",
  RANKING3: "RANKING3",
  RANKING4: "RANKING4",
  RANKING5: "RANKING5",
  NO_PRIZE: "NO_PRIZE",
};

export const PRIZE_TABLE = {
  [RANKINGS.RANKING1]: {
    prize: 2000000000,
    condition: "6개",
  },
  [RANKINGS.RANKING2]: {
    prize: 30000000,
    condition: "5개 + 보너스볼",
  },
  [RANKINGS.RANKING3]: {
    prize: 1500000,
    condition: "5개",
  },
  [RANKINGS.RANKING4]: {
    prize: 50000,
    condition: "4개",
  },
  [RANKINGS.RANKING5]: {
    prize: 5000,
    condition: "3개",
  },
  [RANKINGS.NO_PRIZE]: {
    prize: 0,
    condition: "2개 이하",
  },
};
