const LOTTO = {
  NUMBER_LENGTH: 6,
  NUMBER_RANGE_MIN: 1,
  NUMBER_RANGE_MAX: 45,
};

const MONEY = {
  UNIT: 1000,
  MIN: 0,
};

const FORMATTING = {
  PERCENT: 100,
  ROUND: 100,
};

const RANK = {
  FIRST_PLACE: '1',
  SECOND_PLACE: '2',
  THIRD_PLACE: '3',
  FOURTH_PLACE: '4',
  FIFTH_PLACE: '5',
  LAST_PLACE: '0',
};

const RESTART_OPTION = {
  RESTART: 'y',
  EXIT: 'n',
};

const PRIZE = [
  [
    RANK.FIRST_PLACE,
    {
      MATCH: 6,
      REWARD: 2000000000,
    },
  ],
  [
    RANK.SECOND_PLACE,
    {
      MATCH: 5,
      REWARD: 30000000,
    },
  ],
  [
    RANK.THIRD_PLACE,
    {
      MATCH: 5,
      REWARD: 1500000,
    },
  ],
  [
    RANK.FOURTH_PLACE,
    {
      MATCH: 4,
      REWARD: 50000,
    },
  ],
  [
    RANK.FIFTH_PLACE,
    {
      MATCH: 3,
      REWARD: 5000,
    },
  ],
];

const BLANK = 0;

export default {
  LOTTO,
  MONEY,
  FORMATTING,
  RANK,
  PRIZE,
  BLANK,
  RESTART_OPTION,
};
