import WinningInputsFormView from './WinningInputsFormView.js';
import { KEY } from '../../constants/Configurations.js';
import { BonusNumberValidator } from '../../validators/BonusNumberValidator.js';
import { LottoNumbersValidator } from '../../validators/LottoNumbersValidator.js';
import { RESULT_EVENT_NAME } from '../../constants/WinningInputsFormConstants.js';

class WinningInputsForm {
  constructor($container) {
    this.$view = new WinningInputsFormView($container);
    this.$view.setOnResultRequest((data) => this.handleResultRequest(data));
  }

  handleResultRequest({ winningNumbers, bonusNumber }) {
    try {
      LottoNumbersValidator.validate(KEY.WINNING_NUMBERS, winningNumbers);
      BonusNumberValidator.validate(bonusNumber, winningNumbers);

      const event = new CustomEvent(RESULT_EVENT_NAME, {
        detail: { winningNumbers, bonusNumber },
        bubbles: true,
      });

      this.$view.$container.dispatchEvent(event);
    } catch (e) {
      alert(e.message);
    }
  }
}

export default WinningInputsForm;
