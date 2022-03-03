import MatchResultView from '../EventListener/MatchResultView.js';
import WinningNumberValue from './WinningNumberValue.js';

export default class MatchResultViewImpl extends MatchResultView {
  constructor() {
    super(new WinningNumberValue());
  }

  tabNextInput(currentIndex) {
    this.inputInstance.focusInput(currentIndex + 1);
  }

  moveTabToEmptyInput() {
    this.inputInstance.focusEmptyInput();
  }
}
