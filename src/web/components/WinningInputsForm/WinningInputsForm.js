import WinningInputsFormView from './WinningInputsFormView.js';
import { KEY } from '../../../common/constants/Configurations.js';
import { BonusNumberValidator } from '../../../common/validators/BonusNumberValidator.js';
import {
  LottoNumbersValidator,
  validateDuplicate,
} from '../../../common/validators/LottoNumbersValidator.js';
import { RESULT_EVENT_NAME } from '../../../common/constants/WinningInputsFormConstants.js';

class WinningInputsForm {
  constructor($container) {
    try {
      this.$view = new WinningInputsFormView($container);
      this.$view.setOnResultRequest((data) => this.#handleResultRequest(data));
    } catch (e) {
      alert(e.message);
    }
  }

  #handleResultRequest({ winningNumbers, bonusNumber }) {
    try {
      LottoNumbersValidator.validate(KEY.WINNING_NUMBERS, winningNumbers);
      validateDuplicate(winningNumbers);
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
