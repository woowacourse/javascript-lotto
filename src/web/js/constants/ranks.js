const RANK = Object.freeze({
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  FIFTH: 5,
  INVALID_RANK: 0,
});

const RANKING_TABLE = Object.freeze([
  RANK.INVALID_RANK,
  RANK.INVALID_RANK,
  RANK.INVALID_RANK,
  RANK.FIFTH,
  RANK.FOURTH,
  RANK.THIRD,
  RANK.FIRST,
]);

const TABLE = Object.freeze([
  {
    matchCountTag: '<td>3개</td>',
    prizeTag: '<td>5,000</td>',
    amountOfRank: '',
  },
  {
    matchCountTag: '<td>4개</td>',
    prizeTag: '<td>50,000</td>',
    amountOfRank: '',
  },
  {
    matchCountTag: '<td>5개</td>',
    prizeTag: '<td>1,500,000</td>',
    amountOfRank: '',
  },
  {
    matchCountTag: '<td>5개</td>',
    prizeTag: '<td>30,000,000</td>',
    amountOfRank: '',
  },
  {
    matchCountTag: '<td>6개</td>',
    prizeTag: '<td>2,000,000,000</td>',
    amountOfRank: '',
  },
]);

export { RANK, RANKING_TABLE, TABLE };
