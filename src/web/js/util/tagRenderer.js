import TAGS from '../constant/tags.js';
import QUERY from '../constant/query.js';
import MESSAGE from '../constant/message.js';

const tagGenerator = {
  generateLottos: lottos => {
    return `
		<div id="lottos-amount">
			<span>${MESSAGE.BUY_LOTTO(lottos.length)}</span>
		</div>
		<div id="lottos">
			${TAGS.GENERATE_TICKET(lottos)}
		</div>`;
  },

  generateWinningNumberTags: () => {
    return `
		<span id="winning-numbers-text">${QUERY.WINNING_NUMBERS}</span>
							<div id="winning-numbers-labels">
								<span id="lucky-numbers-text">${MESSAGE.LUCKY_NUMBERS}</span>
								<span id="bonus-number-text">${MESSAGE.BONUS_NUMBER}</span>
							</div>
							<div id="winning-numbers-inputs">
								<div id="winning-numbers-labels">
									<label id="lucky-numbers-label" for="lucky-numbers-form">
									</label>
									<label id="bonus-number-label" for="bonus-number-form">
									</label>
								</div>
								<div id="winning-numbers-forms">
									<form id="lucky-numbers-form">
									${TAGS.GENERATE_LUCKY_NUMBER_INPUT()}
									</form>
									<form id="bonus-number-form">
									${TAGS.BONUS_NUMBER_INPUT}
									</form>
								</div>
							</div>`;
  },
};

export default tagGenerator;
