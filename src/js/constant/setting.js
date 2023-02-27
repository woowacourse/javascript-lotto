const RANK = {
  FIFTH: { name: 'FIFTH', matchCount: 3, rewards: 5_000 },
  FOURTH: { name: 'FOURTH', matchCount: 4, rewards: 50_000 },
  THIRD: { name: 'THIRD', matchCount: 5, rewards: 1_500_000 },
  SECOND: { name: 'SECOND', matchCount: 5, rewards: 30_000_000 },
  FIRST: { name: 'FIRST', matchCount: 6, rewards: 2_000_000_000 },
};

const LOTTO = {
  UNIT: 1_000,
  MIN_NUMBER_RANGE: 1,
  MAX_NUMBER_RANGE: 45,
  LENGTH: 6,
  INDEX_STARTING_SLICING: 0,
  INDEX_ENDING_SLICING: 6,
};

const AVAILABLE_NUMBERS = Array.from({ length: LOTTO.MAX_NUMBER_RANGE }, (v, i) => i + 1);

const COMMAND = {
  YES: 'y',
  NO: 'n',
};

const KEY_CODE = {
  ENTER: 13,
  ESC: 27,
};

export { RANK, LOTTO, COMMAND, AVAILABLE_NUMBERS, KEY_CODE };
