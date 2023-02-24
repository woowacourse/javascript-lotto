import TAGS from '../constants/tags.js';
import MESSAGE from '../constants/message.js';
import { TABLE } from '../constants/ranks.js';

const tagGenerators = {
  generateLottos: lottos => {
    return `
		<div id="lottos-amount-text">
			<span>${MESSAGE.BUY_LOTTO(lottos.length)}</span>
		</div>
		<div id="lotto-tickets">
			${TAGS.GENERATE_TICKET(lottos)}
		</div>`;
  },

  generateWinningNumberForm: () => {
    return `
		<form id="winning-numbers-form">
			<div id="winning-numbers-container">
				<div>
					${TAGS.GENERATE_LUCKY_NUMBER_INPUT()}
				</div>
				<div>
					<input type="number" name="bonus-number">
				</div>
			</div>
			<input id="calculate-lottos-button" type="submit" value="결과 확인하기">
		</form>`;
  },

  generateWinningNumberTags() {
    return `
		${TAGS.WINNING_NUMBERS_LABELS}
		${this.generateWinningNumberForm()}`;
  },

  generateAmountOfRanks(amountOfRanks) {
    TAGS.GENERATE_AMOUNT_OF_RANKS(amountOfRanks);

    return TABLE.map(rank => `<tr>${Object.values(rank).join('\n')}</tr>`).join(
      '\n'
    );
  },

  generateDialog() {
    return `
		<div id="dialog-container">
			<input id="exit-button" type="button" value="❎">
			<div id="result">
			</div>
		</div>`;
  },

  generateResult(result) {
    return `
			<span id="result-title">${MESSAGE.STATISTICS}</span>
			<table id="result-table">
				${TAGS.TABLE_TITLES}
				${this.generateAmountOfRanks(result.amountOfRanks)}
			</table>
			<span id="profit-text">${MESSAGE.GET_PROFIT(result.profit)}</span>
			<input id="retry-button" type="button" value="다시 시작하기">`;
  },
};

export default tagGenerators;
