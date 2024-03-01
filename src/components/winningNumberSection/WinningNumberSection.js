import './WinningNumberSection.css';
import CONFIG from '../../constants/config';
import Component from '../core/Component';
import { DOM_MESSAGE } from '../../constants/message';

class WinningNumberSection extends Component {
  template() {
    return `
        <div>${DOM_MESSAGE.LOTTO_NUMBERS_INPUT}</div>
        <form id="lottoNumberForm">
          <div id="lottoNumberWrapper">
            <div id="winningNumberWrapper">
              <div>${DOM_MESSAGE.WINNING_NUMBERS}</div>
              ${Array.from({ length: CONFIG.LOTTO_LENGTH })
                .map(() => `<input class="winningNumberInput" type="number" />`)
                .join(' ')}
              <div id="lottoNumberError" class="hidden"></div>
            </div>
            <div id="bonusNumberWrapper">
              <div>${DOM_MESSAGE.BONUS_NUMBER}</div>
              <input id="bonusNumberInput" type="number"/>
            </div>
          </div>
          <button id="lottoResultButton" class="button">${DOM_MESSAGE.LOTTO_RESULT_BUTTON}</button>
        </form>`;
  }
}

export default WinningNumberSection;
