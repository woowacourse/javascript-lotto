import View from '../EventListener/View.js';
import WinningNumberValue from './WinningNumberValue.js';

export default class MatchResultView extends View {
  constructor() {
    super(new WinningNumberValue());
  }

  tabNextInput(currentIndex) {
    this.inputInstance.focusInput(currentIndex + 1);
  }
}
