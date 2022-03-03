import { $, $$, emit, on } from '../utils/helper.js';
import { lottoWinningNumberInputTemplate } from '../utils/template.js';

export default class LottoWinningNumberInputView {
  #lottoPurchaseResult;

  #lottoWinningNumberContainers;

  #lottoMatchResultForm;

  constructor() {
    this.#lottoPurchaseResult = $('#lotto-purchase-result');
  }

  selectDOM() {
    this.#lottoMatchResultForm = $('#lotto-match-result-form');
    this.#lottoWinningNumberContainers = $$('.lotto-winning-number-container');
  }

  get lottoMatchResultForm() {
    return this.#lottoMatchResultForm;
  }

  attachEvents() {
    on(this.#lottoMatchResultForm, 'submit', this.#handleMatchResult.bind(this));
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
  }

  reset() {
    this.#lottoMatchResultForm.reset();
  }
}

// #handleBlockNotNumberInput(event) {
//   const conditions = ['Key', 'Space'];

//   if (conditions.some((ele) => event.code.includes(ele))) {
//     event.preventDefault();
//   }
// }
