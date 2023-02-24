const {
  CORRECT_COUNT_PER_RANK,
  INDEX_TO_KEY_CONVERTER,
  PROFIT,
  REGEX,
} = require('../constants/constants');

const showTableRow = (rank, correctCount) => {
  return `
  <tr>
    <td>
      ${CORRECT_COUNT_PER_RANK[INDEX_TO_KEY_CONVERTER[rank - 1]]}개 일치
      ${rank === 2 ? '+보너스 볼' : ''}
    </td>
    <td>
      ${PROFIT[INDEX_TO_KEY_CONVERTER[rank - 1]]
        .toString()
        .replace(REGEX.PRICE_FORMAT, ',')}원
    </td>
    <td>${correctCount}개</td>
  </tr>
  `;
};

module.exports = { showTableRow };
