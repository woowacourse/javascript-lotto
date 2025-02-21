export const LOTTO = {
  MIN_RANDOM_VALUE: 1,
  MAX_RANDOM_VALUE: 45,
  LENGTH: 6,
  SPLITTER: ",",
};

export const KEYS = {
  FIRST: "1등",
  SECOND: "2등",
  THIRD: "3등",
  FOURTH: "4등",
  FIFTH: "5등",
};

export const WINNING = {
  [KEYS.FIRST]: {
    MATCH: 6,
    LABEL: "6개 일치",
    PRIZES: 2_000_000_000,
  },
  [KEYS.SECOND]: {
    MATCH: 5,
    LABEL: "5개 일치, 보너스 볼 일치",
    PRIZES: 30_000_000,
  },
  [KEYS.THIRD]: {
    MATCH: 5,
    LABEL: "5개 일치",
    PRIZES: 1_500_000,
  },
  [KEYS.FOURTH]: {
    MATCH: 4,
    LABEL: "4개 일치",
    PRIZES: 50_000,
  },
  [KEYS.FIFTH]: {
    MATCH: 3,
    LABEL: "3개 일치",
    PRIZES: 5_000,
  },
};
