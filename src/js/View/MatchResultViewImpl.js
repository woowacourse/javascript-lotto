import MatchResultView from '../EventListener/MatchResultView.js';
import WinningNumberValue from './WinningNumberValue.js';

export default class MatchResultViewImpl extends MatchResultView {
  constructor() {
    super(new WinningNumberValue());
  }

  moveTabToEmptyInput() {
    this.inputInstance.focusEmptyInput();
  }
}
