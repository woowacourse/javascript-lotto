import { $costInput, $costSubmitButton } from '../../elements.js';

const costSection = {
  init() {
    $costInput.value = '';
    costSection.activateButton();
  },

  activateButton() {
    $costSubmitButton.removeAttribute('disabled');
  },

  disableButton() {
    $costSubmitButton.setAttribute('disabled', true);
  },
};

export default costSection;
