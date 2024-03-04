const SETTING = {
  MIN_LOTTO_NUMBER: 1,
  MAX_LOTTO_NUMBER: 45,
  LOTTO_LENGTH: 6,
  LOTTO_PRICE: 1_000,
  MIN_RANKING_MATCHING_NUMBER: 3,
  RESTART_COMMAND: 'y',
  EXIT_COMMAND: 'n',
};

const RANKING = {
  3: { MATCHING_COUNT: 3, TITLE: '3개 일치', TITLE_UI: '3개', REWARD: 5_000 },
  4: { MATCHING_COUNT: 4, TITLE: '4개 일치', TITLE_UI: '4개', REWARD: 50_000 },
  5: { MATCHING_COUNT: 5, TITLE: '5개 일치', TITLE_UI: '5개', REWARD: 1_500_000 },
  B5: { MATCHING_COUNT: 5, TITLE: '5개 일치, 보너스 볼 일치', TITLE_UI: '5개+보너스볼', REWARD: 30_000_000 },
  6: { MATCHING_COUNT: 6, TITLE: '6개 일치', TITLE_UI: '6개', REWARD: 2_000_000_000 },
};

export { SETTING, RANKING };
