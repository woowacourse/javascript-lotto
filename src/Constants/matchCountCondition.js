import deepFreeze from '../Utils/deepFreeze';

const MATCH_COUNT_CONDITION = deepFreeze({
  FIRST: {
    COUNT: 6,
    RANK: 1,
  },
  SECOND: {
    COUNT: 5,
    RANK: 2,
  },
  THIRD: {
    COUNT: 5,
    RANK: 3,
  },
  FOURTH: {
    COUNT: 4,
    RANK: 4,
  },
  FIFTH: {
    COUNT: 3,
    RANK: 5,
  },
});

export default MATCH_COUNT_CONDITION;
