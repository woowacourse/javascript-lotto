export const RANK_KEYS = {
  FIRST: '1등',
  SECOND: '2등',
  THIRD: '3등',
  FORTH: '4등',
  FIFTH: '5등',
  UNRANK: '꽝',
};

export const RANK = {
  '6true': RANK_KEYS.FIRST,
  '6false': RANK_KEYS.FIRST,
  '5ture': RANK_KEYS.SECOND,
  '5false': RANK_KEYS.THIRD,
  '4true': RANK_KEYS.FORTH,
  '4false': RANK_KEYS.FORTH,
  '3true': RANK_KEYS.FIFTH,
  '3false': RANK_KEYS.FIFTH,
  UNRANK: RANK_KEYS.UNRANK,
};

export const RANK_PRICE = {
  [`${RANK_KEYS.UNRANK}`]: 0,
  [`${RANK_KEYS.FIFTH}`]: 5000,
  [`${RANK_KEYS.FORTH}`]: 50000,
  [`${RANK_KEYS.THIRD}`]: 1500000,
  [`${RANK_KEYS.SECOND}`]: 30000000,
  [`${RANK_KEYS.FIRST}`]: 2000000000,
};
