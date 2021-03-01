import { $costInput, $costSubmitButton } from '../../elements.js';

const costSection = {
  costInputInit() {
    $costInput.value = '';
  },

  activateButton() {
    $costSubmitButton.removeAttribute('disabled');
  },

  disableButton() {
    $costSubmitButton.setAttribute('disabled', true);
  },
};

export default costSection;
