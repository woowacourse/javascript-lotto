import { $, $$, emit, on } from '../utils/helper.js';
import { lottoWinningNumberInputTemplate } from '../utils/template.js';

export default class LottoWinningNumberInputView {
  #lottoPurchaseResultSection;

  #lottoWinningNumber;

  constructor() {
    this.#lottoPurchaseResultSection = $('#lotto-purchase-result-section');
  }

  get lottoWinningNumberForm() {
    return this.#lottoWinningNumber.form;
  }

  #handleMatchResult(event) {
    event.preventDefault();

    const lottoWinningNumbers = Array.from(this.#lottoWinningNumber.containers).map((element) =>
      Number(element.value)
    );
    const lottoWinningBonusNumber = Number(lottoWinningNumbers.pop());

    emit(this.#lottoWinningNumber.form, '@matchResult', {
      lottoWinningNumbers,
      lottoWinningBonusNumber,
    });
  }

  render() {
    this.#lottoPurchaseResultSection.insertAdjacentHTML(
      'afterend',
      lottoWinningNumberInputTemplate()
    );

    this.#selectDOM();
    this.#attachEvents();
  }

  #selectDOM() {
    this.#lottoWinningNumber = {
      inputSection: $('#lotto-winning-number-input-section'),
      form: $('#lotto-winning-number-form'),
      containers: $$('.lotto-winning-number-container'),
    };
  }

  #attachEvents() {
    on(this.#lottoWinningNumber.form, 'submit', this.#handleMatchResult.bind(this));
  }

  reset() {
    this.#lottoWinningNumber.form.reset();
  }

  restart() {
    this.#lottoWinningNumber.inputSection.remove();
  }
}
