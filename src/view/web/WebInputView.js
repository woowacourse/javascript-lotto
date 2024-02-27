import { $, $$ } from '../../util/domSelector';
import { hideElement } from '../../util/view';

const WebInputView = {
  resetMoneyInput() {
    $('#money-input').value = '';
  },

  focusMoneyInput() {
    $('#money-input').focus();
  },

  hideWinningLottoSection() {
    hideElement($('#winning-lotto-section'));
  },

  renderWinningLottoSection() {
    hideElement('#winning-lotto-section');
  },

  resetWinningLottoNumbers() {
    $$('.number-input').forEach((input) => (input.value = ''));
    $('.number-input').focus();
  },
};

export default WebInputView;
