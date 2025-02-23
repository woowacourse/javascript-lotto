export const LOTTO = {
  MIN_RANDOM_VALUE: 1,
  MAX_RANDOM_VALUE: 45,
  LENGTH: 6,
};

export const KEYS = {
  FIRST: "1등",
  SECOND: "2등",
  THIRD: "3등",
  FOURTH: "4등",
  FIFTH: "5등",
};

const MATCHES = {
  [KEYS.FIRST]: 6,
  [KEYS.SECOND]: 5,
  [KEYS.THIRD]: 5,
  [KEYS.FOURTH]: 4,
  [KEYS.FIFTH]: 3,
};

export const WINNING = {
  [KEYS.FIRST]: {
    MATCH: MATCHES[KEYS.FIRST],
    LABEL: `${MATCHES[KEYS.FIRST]}개 일치`,
    PRIZES: 2_000_000_000,
  },
  [KEYS.SECOND]: {
    MATCH: MATCHES[KEYS.SECOND],
    LABEL: `${MATCHES[KEYS.SECOND]}개 일치, 보너스 볼 일치`,
    PRIZES: 30_000_000,
  },
  [KEYS.THIRD]: {
    MATCH: MATCHES[KEYS.THIRD],
    LABEL: `${MATCHES[KEYS.THIRD]}개 일치`,
    PRIZES: 1_500_000,
  },
  [KEYS.FOURTH]: {
    MATCH: MATCHES[KEYS.FOURTH],
    LABEL: `${MATCHES[KEYS.FOURTH]}개 일치`,
    PRIZES: 50_000,
  },
  [KEYS.FIFTH]: {
    MATCH: MATCHES[KEYS.FIFTH],
    LABEL: `${MATCHES[KEYS.FIFTH]}개 일치`,
    PRIZES: 5_000,
  },
};
