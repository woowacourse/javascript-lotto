import { $ } from './utils/dom.js';
import {
  getLottoPrice,
  checkLottoPrice,
} from './core/checkLottoPriceInputValue.js';

import { makeLottoList } from './core/makeLottoList.js';
import { checkLastLottoNumberValid } from './core/checkLastLottoNumberInput.js';

import {
  computeLottoRankList,
  computeLottoRateOfReturn,
} from './core/computeLottoWinningValue.js';
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
    const lottoPrice = checkLottoPrice(getLottoPrice());
    if (!lottoPrice) {
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
    const lastLottoNumbers = checkLastLottoNumberValid();
    if (!lastLottoNumbers) {
      document
        .querySelectorAll('.last-lotto-winning-number-input')
        .forEach(input => {
          input.value = '';
        });
      return;
    }
    const lastLottoNumberList = lastLottoNumbers.slice(
      0,
      lastLottoNumbers.length - 1,
    );
    const bonusNumber = lastLottoNumbers[lastLottoNumbers.length - 1];
    renderRateOfReturnResult(
      computeLottoRateOfReturn(this.lottoList, [
        lastLottoNumberList,
        bonusNumber,
      ]),
    );
    renderLottoWinningCount(
      computeLottoRankList(this.lottoList, [lastLottoNumberList, bonusNumber]),
    );
    toggleLottoResultModal();
  };
}

new App();
