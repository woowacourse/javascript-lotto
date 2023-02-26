const {
  CORRECT_COUNT_PER_RANK,
  INDEX_TO_KEY_CONVERTER,
  PROFIT,
  REGEX,
} = require('../constants/constants');

const showTableRow = (rank, correctCount) => {
  const correctCountPerRank =
    CORRECT_COUNT_PER_RANK[INDEX_TO_KEY_CONVERTER[rank - 1]];
  const bonusOrNotString = rank === 2 ? '+보너스 볼' : '';
  const profitPerRank = PROFIT[INDEX_TO_KEY_CONVERTER[rank - 1]];
  const profitByStringFormat = profitPerRank
    .toString()
    .replace(REGEX.PRICE_FORMAT, ',');

  return `
  <tr>
    <td>
      ${correctCountPerRank}개 일치
      ${bonusOrNotString}
    </td>
    <td>
      ${profitByStringFormat}원
    </td>
    <td>${correctCount}개</td>
  </tr>
  `;
};

module.exports = { showTableRow };
