import { $, $$, emit, on } from '../utils/helper.js';
import { lottoWinningNumberInputTemplate } from '../utils/template.js';

export default class LottoWinningNumberInputView {
  #lottoPurchaseResult;

  #lottoWinningNumberContainers;

  #lottoWinningBonusNumber;

  #lottoMatchResultForm;

  constructor() {
    this.#lottoPurchaseResult = $('#lotto-purchase-result');
  }

  selectDOM() {
    this.#lottoMatchResultForm = $('#lotto-match-result-form');
    this.#lottoWinningNumberContainers = $$('.lotto-winning-number-container');
    this.#lottoWinningBonusNumber = $('#lotto-winning-bonus-number');
  }

  get lottoMatchResultForm() {
    return this.#lottoMatchResultForm;
  }

  attachEvents() {
    on(
      this.#lottoMatchResultForm,
      'submit',
      this.#handleMatchResult.bind(this)
    );
  }

  #handleMatchResult(event) {
    event.preventDefault();

    const lottoWinningNumbers = Array.from(
      this.#lottoWinningNumberContainers
    ).map((element) => Number(element.value));

    const lottoWinningBonusNumber = Number(this.#lottoWinningBonusNumber.value);

    emit(this.#lottoMatchResultForm, '@matchResult', {
      lottoWinningNumbers,
      lottoWinningBonusNumber,
    });
  }

  // #handleBlockNotNumberInput(event) {
  //   const conditions = ['Key', 'Space'];

  //   if (conditions.some((ele) => event.code.includes(ele))) {
  //     event.preventDefault();
  //   }
  // }

  render() {
    this.#lottoPurchaseResult.insertAdjacentHTML(
      'afterend',
      lottoWinningNumberInputTemplate()
    );
  }
}
