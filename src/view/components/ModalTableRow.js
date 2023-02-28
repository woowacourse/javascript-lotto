const {
  CORRECT_COUNT_PER_RANK,
  INDEX_TO_KEY_CONVERTER,
  PROFIT,
  REGEX,
} = require('../../constants/constants');

const ModalTableRow = (rank, correctCount) => {
  const correctCountPerRankData = `${
    CORRECT_COUNT_PER_RANK[INDEX_TO_KEY_CONVERTER[rank - 1]]
  }개 일치${rank === 2 ? ',+보너스 볼' : ''}`;
  const profitData = `${PROFIT[INDEX_TO_KEY_CONVERTER[rank - 1]]
    .toString()
    .replace(REGEX.PRICE_FORMAT, ',')}원`;

  return `
          <tr>
            <td>${correctCountPerRankData}</td>
            <td>${profitData}</td>
            <td>${correctCount}개</td>
          </tr>
      `;
};

module.exports = ModalTableRow;
