import { $, $$, emit, on } from '../utils/helper.js';
import { lottoWinningNumberInputTemplate } from '../utils/template.js';

export default class LottoWinningNumberInputView {
  #lottoPurchaseResult;

  #lottoWinningNumberContainers;

  #lottoMatchResultForm;

  #lottoWinningNumberInputSection;

  constructor() {
    this.#lottoPurchaseResult = $('#lotto-purchase-result');
  }

  get lottoMatchResultForm() {
    return this.#lottoMatchResultForm;
  }

  #handleMatchResult(event) {
    event.preventDefault();

    const lottoWinningNumbers = Array.from(this.#lottoWinningNumberContainers).map((element) =>
      Number(element.value)
    );

    const lottoWinningBonusNumber = Number(lottoWinningNumbers.pop());

    emit(this.#lottoMatchResultForm, '@matchResult', {
      lottoWinningNumbers,
      lottoWinningBonusNumber,
    });
  }

  render() {
    this.#lottoPurchaseResult.insertAdjacentHTML('afterend', lottoWinningNumberInputTemplate());

    this.#selectDOM();
    this.#attachEvents();
  }

  #selectDOM() {
    this.#lottoMatchResultForm = $('#lotto-match-result-form');
    this.#lottoWinningNumberContainers = $$('.lotto-winning-number-container');
    this.#lottoWinningNumberInputSection = $('#lotto-winning-number-input-section');
  }

  #attachEvents() {
    on(this.#lottoMatchResultForm, 'submit', this.#handleMatchResult.bind(this));
  }

  reset() {
    this.#lottoMatchResultForm.reset();
  }

  restart() {
    this.#lottoWinningNumberInputSection.remove();
  }
}

// #handleBlockNotNumberInput(event) {
//   const conditions = ['Key', 'Space'];

//   if (conditions.some((ele) => event.code.includes(ele))) {
//     event.preventDefault();
//   }
// }
