import { KEYCODE } from '../constants/setting';

export default class InputView {
  preventNonDigitInput(event) {
    const inputKeyCode = event.keyCode;

    const isValidKeyCode = [KEYCODE.BACKSPACE, KEYCODE.TAB, KEYCODE.ENTER].some(
      (keyCode) => inputKeyCode === keyCode
    );
    if (isValidKeyCode) {
      return;
    }

    if (inputKeyCode < KEYCODE.ZERO || inputKeyCode > KEYCODE.NINE) {
      event.preventDefault();
    }
  }
}
