import { addComma } from '../utils/stringHandler';
import MESSAGE from '../constants/message.js';
import LOTTO from '../constants/lotto.js';
import { MATCH_COUNT } from '../constants/ranks.js';

const TagGenerators = {
  generateLottos: lottos => {
    const tickets = lottos
      .map(numbers => {
        return `
			<div class="ticket">
			<p class="lotto-emoji">🎟️</p>
			<div>${numbers.join(', ')}</div>
			</div>`;
      })
      .join('');

    return `
		<p class="lottos-amount-text">${MESSAGE.BUY_LOTTO(lottos.length)}</p>
		<div class="lotto-tickets">
		${tickets}
		</div>`;
  },

  generateWinningNumberTags: () => {
    const luckyNumberInputs = Array.from(
      { length: 6 },
      (_, index) =>
        `<input id="lucky-number-0${
          index + 1
        }" type="number" name="lucky-number-0${index + 1}">`
    ).join('');

    return `
		<p class="winning-numbers-text">${MESSAGE.WINNING_NUMBERS}</p>
		<form id="winning-numbers-form">
			<div class="winning-numbers-labels">
				<label id="lucky-numbers-label" for="lucky-number-01">
					당첨 번호
				</label>
				<label id="bonus-number-label" for="bonus-number">
					보너스 번호
				</label>
			</div>
			<div class="winning-numbers-container">
				<div>
				${luckyNumberInputs}
				</div>
				<div>
				<input id="bonus-number" type="number" name="bonus-number">
				</div>
			</div>
				<button class="calculate-lottos-button">결과 확인하기</button>
		</form>`;
  },

  generateDialog: () => {
    return `
				<div class="dialog-container">
				<button class="exit-button" id="exit-button" type="button">❎</button>
				<div class="result" id="result">
				</div>
				</div>`;
  },

  generateResult: result => {
    const generateRankTable = (matchCount, prize, amountOfRank) =>
      `<tr>
				<td>${matchCount}개</td>
				<td>${prize}</td>
				<td>${amountOfRank}</td>
			</tr>`;

    const reverseAmountOfRanks = [...result.amountOfRanks].reverse();
    const reversePrize = [...LOTTO.PRIZE_MONEY].reverse();

    const table = MATCH_COUNT.map((matchCount, index) =>
      generateRankTable(
        matchCount,
        addComma(reversePrize[index]),
        reverseAmountOfRanks[index]
      )
    ).join('\n');

    return `
						<span class="result-title">${MESSAGE.STATISTICS}</span>
						<table class="result-table">
						<tr>
						<th scope="col">일치 갯수</th>
					<th scope="col">당첨금</th>
					<th scope="col">당첨 갯수</th>
					</tr>
					${table}
					</table>
					<span class="profit-text">${MESSAGE.GET_PROFIT(result.profit)}</span>
					<button id="retry-button" class="retry-button" type="button">다시 시작하기</button>`;
  },
};
export default TagGenerators;
