import { NUMBER_INPUT_PASS_INFO } from '../constants/constant.js';
import { $ } from '../utils/dom.js';

function moveNextInputElement(element, index) {
  if (
    index === NUMBER_INPUT_PASS_INFO.LAST_ELEMENT_MOVE_FLAG &&
    element.value.length >= NUMBER_INPUT_PASS_INFO.INPUT_LENGTH
  ) {
    $('.bonus-input').focus();
    return;
  }
  if (element.value.length >= NUMBER_INPUT_PASS_INFO.INPUT_LENGTH) {
    if (element.nextElementSibling) {
      element.nextElementSibling.focus();
    }
  }
}

export default function changeLottoNumberInputFocus() {
  const lottoNumberInputElements = document.querySelectorAll(
    '.last-lotto-winning-number-input',
  );
  lottoNumberInputElements.forEach((element, index) => {
    element.addEventListener('keyup', () => {
      moveNextInputElement(element, index);
    });
  });
}
