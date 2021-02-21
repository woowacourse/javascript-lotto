import { $, $$, show, hide } from '../utils/DOM.js';

export default class WinningNumberInput {
  constructor({ isVisible }) {
    this.$winningNumberForm = $('.winning-number-form');
    this.$winningNumberInputs = $$('.winning-number');
    this.$bonusNumberInput = $('.bonus-number');

    this.isVisible = isVisible;
  }

  setState({ isVisible }) {
    this.isVisible = isVisible;
    this.render();
  }

  render() {
    this.isVisible ? show(this.$winningNumberForm) : hide(this.$winningNumberForm);
  }
}
