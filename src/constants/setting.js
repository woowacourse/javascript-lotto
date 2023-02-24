const RANK = {
  FIFTH: { NAME: 'FIFTH', MATCH_COUNT: 3, REWARDS: 5_000 },
  FOURTH: { NAME: 'FOURTH', MATCH_COUNT: 4, REWARDS: 50_000 },
  THIRD: { NAME: 'THIRD', MATCH_COUNT: 5, REWARDS: 1_500_000 },
  SECOND: { NAME: 'SECOND', MATCH_COUNT: 5, REWARDS: 30_000_000 },
  FIRST: { NAME: 'FIRST', MATCH_COUNT: 6, REWARDS: 2_000_000_000 },
};

const RANK_MATCH = Object.values(RANK).reduce((acc, { NAME, MATCH_COUNT }) => {
  if (NAME === RANK.SECOND.NAME) {
    return acc;
  }

  return { ...acc, [MATCH_COUNT]: NAME };
}, {});

const INIT_RANKING = Object.values(RANK).reduce((acc, { NAME }) => ({ ...acc, [NAME]: 0 }), {});

const LOTTO = {
  UNIT: 1_000,
  MIN_NUMBER_RANGE: 1,
  MAX_NUMBER_RANGE: 45,
  SIZE: 6,
  BONUS_SIZE: 1,
};

const PURCHASE = {
  MIN: 1_000,
  MAX: 100_000,
  STEP: 1_000,
};

const COMMAND = {
  YES: 'y',
  NO: 'n',
};

export { RANK, RANK_MATCH, INIT_RANKING, LOTTO, PURCHASE, COMMAND };
