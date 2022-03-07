import { $ } from './utils/dom.js';
import { getLottoPrice } from './modules/checkLottoPriceInputValue.js';
import { getLastLottoNumbers } from './modules/checkLastLottoNumberInput.js';

import { makeLottoList } from './core/makeLottoList.js';

import toggleLottoResultModal from './component/toggleLottoResultModal.js';
import { toggleButton } from './component/toggleButton.js';

import {
  renderPurchasedLottoList,
  renderLastLottoNumber,
  renderPurchasedLottoListContent,
  renderPurchasedLottoListContentIsActive,
  renderRateOfReturnResult,
  renderLottoWinningCount,
} from './views/render.js';
import CalculateLottoPrize from './modules/calculateLottoPrize.js';
import changeLottoNumberInputFocus from './modules/changeLottoNumberInputFocus.js';

export default class App {
  constructor() {
    this.lottoFormSubmitEvent = this.handleLottoFormSubmitEvent.bind(this);
    this.toggleButtonClickEvent = this.handleToggleButtonClick.bind(this);
    this.handleEvent();
    this.lottoPrice = 0;
    this.lottoPriceValid = false;
    this.lottoList = [];
  }

  handleEvent() {
    $('.lotto-price-input-form').addEventListener(
      'submit',
      this.lottoFormSubmitEvent,
    );
    $('.purchased-lotto-list-container').addEventListener(
      'click',
      this.toggleButtonClickEvent,
    );
    $('.last-lotto-winning-number-container').addEventListener(
      'click',
      this.handleCheckResultButtonClick,
    );
    $('.winning-rate-close-button').addEventListener(
      'click',
      toggleLottoResultModal,
    );
    $('.restart-button').addEventListener('click', e => {
      e.preventDefault();
      location.reload();
    });
  }
  handleLottoFormSubmitEvent(e) {
    e.preventDefault();
    this.handlePriceInputSubmit();
    this.handleDrawLotto();
  }
  handlePriceInputSubmit() {
    const lottoPrice = getLottoPrice();
    if (lottoPrice === false) {
      $('.lotto-price-input').value = '';
      return;
    }
    this.lottoPrice = lottoPrice;
    this.lottoPriceValid = true;
    $('.lotto-price-input').disabled = true;
    $('.lotto-price-submit-button').disabled = true;
  }

  handleDrawLotto() {
    if (!this.lottoPriceValid) {
      return;
    }
    this.lottoList = makeLottoList(this.lottoPrice);
    renderPurchasedLottoList(this.lottoList.length);
    renderLastLottoNumber();
    changeLottoNumberInputFocus();
  }

  handleToggleButtonClick(e) {
    e.preventDefault();
    if (!e.target.classList.contains(`onoff-switch`)) {
      return;
    }
    toggleButton();
    if ($('.purchased-lotto-main').classList.contains('is-active')) {
      renderPurchasedLottoListContentIsActive(this.lottoList);
      return;
    }
    renderPurchasedLottoListContent(this.lottoList.length);
  }

  handleCheckResultButtonClick = e => {
    e.preventDefault();
    if (!e.target.classList.contains('check-result-button')) {
      return;
    }
    const lastLottoNumbers = getLastLottoNumbers();
    const lottoWinningInputElementList = document.querySelectorAll(
      '.last-lotto-winning-number-input',
    );
    if (!lastLottoNumbers) {
      lottoWinningInputElementList.forEach(input => {
        input.value = '';
      });
      return;
    }
    lottoWinningInputElementList.forEach(input => {
      input.disabled = true;
    });
    const lottoPrize = new CalculateLottoPrize(
      this.lottoList,
      lastLottoNumbers,
    );
    renderRateOfReturnResult(lottoPrize.computeLottoRateOfReturn());
    renderLottoWinningCount(lottoPrize.computeLottoRankList());
    toggleLottoResultModal();
  };
}

new App();
