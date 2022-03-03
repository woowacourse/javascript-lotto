import MatchResultView from '../EventListener/MatchResultView.js';
import WinningNumberValue from './WinningNumberValue.js';
import { $ } from '../utils/index.js';

export default class MatchResultViewImpl extends MatchResultView {
  constructor() {
    super(new WinningNumberValue());
    this.$lottoMatchArea = $('#lotto-match-area');
  }

  moveTabToEmptyInput() {
    this.inputInstance.focusEmptyInput();
  }

  show() {
    this.$lottoMatchArea.classList.add('show');
  }

  hide() {
    this.$lottoMatchArea.classList.remove('show');
  }
}
