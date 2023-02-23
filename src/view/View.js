import { $, $$ } from '../utils/dom.js';
import { LOTTO_PRIZE_MONEY, PRIZE_MATCH_COUNT } from '../constants/condition.js';

export default class View {
  onClickPurchaseAmountSubmitButton(callback) {
    $('.purchase-amount-submit-button').addEventListener('click', (e) => {
      e.preventDefault();
      callback();
    });
  }

  onClickWinningLottoSubmitButton(callback) {
    $('.winning-lotto-submit-button').addEventListener('click', (e) => {
      e.preventDefault();
      callback();
    });
  }

  onClickModalCloseButton() {
    $('.modal-close-button').addEventListener('click', () => {
      this.initStatistics();
      this.enableElements($('.winning-lotto-submit-button'));
      this.hideElements('.result-modal');
    });
  }

  onClickRestartButton(callback) {
    $('.restart-button').addEventListener('click', () => {
      callback();
      this.initLottoQuantity();
      this.initEachLottoNumbers();
      this.initStatistics();
      this.initYieldRatio();

      this.initPurchaseAmountInput();
      this.initWinningLottoInput();

      this.enableElements(
        $('.purchase-amount-input'),
        $('.purchase-amount-submit-button'),
        ...$$('.winning-number-input'),
        $('.bonus-number-input'),
        $('.winning-lotto-submit-button')
      );

      this.hideElements('.result-modal', '.winning-lotto-form');
    });
  }

  printLottoQuantity(quantity) {
    $('.lotto-quantity').innerText = `총 ${quantity}개를 구매하였습니다.`;
  }

  printEachLottoNumbers(eachLottoNumbers) {
    const $target = $('.lotto-numbers-list');
    const $fragment = document.createDocumentFragment();

    eachLottoNumbers.forEach((lottoNumbers) => {
      const $li = document.createElement('li');
      const listContent = `🎟️ ${lottoNumbers.join(', ')}`;

      $li.textContent = listContent;
      $li.className = 'lotto-numbers-list-item';

      $fragment.appendChild($li);
    });

    $target.appendChild($fragment);
  }

  printStatistics(statistics) {
    const $target = $('.modal-statistics-container');
    const $fragment = document.createDocumentFragment();

    Object.entries(statistics).forEach(([prize, count]) => {
      const $container = document.createElement('div');
      $container.className = 'statistics-container';

      const matchCountDiv = `<div>${PRIZE_MATCH_COUNT[prize]}개</div>`;
      const prizeMoneyDiv = `<div>${LOTTO_PRIZE_MONEY[prize].toLocaleString('ko-KR')}</div>`;
      const prizeCountDiv = `<div>${count}개</div>`;

      if (prize === 'secondPrize') {
        const matchCountDivOfBonus = `<div>${PRIZE_MATCH_COUNT[prize]}개+보너스 볼</div>`;

        $container.innerHTML = `${matchCountDivOfBonus}${prizeMoneyDiv}${prizeCountDiv}`;

        $fragment.appendChild($container);
        return;
      }

      $container.innerHTML = `${matchCountDiv}${prizeMoneyDiv}${prizeCountDiv}`;

      $fragment.appendChild($container);
    });

    $target.appendChild($fragment);
  }

  printYieldRatio(yieldRatio) {
    const yieldRatioText =
      '당신의 총 수익률은 ' + `${yieldRatio.toLocaleString(new Intl.NumberFormat('KRW'))}%입니다.`;

    $('.modal-yield-ratio').innerText = yieldRatioText;
  }

  enableElements(...elements) {
    elements.forEach((element) => {
      element.disabled = false;
    });
  }

  disableElements(...elements) {
    elements.forEach((element) => {
      element.disabled = true;
    });
  }

  showElements(...elements) {
    elements.forEach((element) => {
      $(element).classList.remove('hide');
    });
  }

  hideElements(...elements) {
    elements.forEach((element) => {
      $(element).classList.add('hide');
    });
  }

  initLottoQuantity() {
    $('.lotto-quantity').innerText = '';
  }

  initEachLottoNumbers() {
    const $target = $('.lotto-numbers-list');

    while ($target.hasChildNodes()) {
      $target.removeChild($target.firstChild);
    }
  }

  initStatistics() {
    const $target = $('.modal-statistics-container');
    const $titleContainer = $target.firstChild;

    while ($target.hasChildNodes()) {
      $target.removeChild($target.firstChild);
    }

    $target.appendChild($titleContainer);
  }

  initYieldRatio() {
    $('.modal-yield-ratio').innerText = '';
  }

  initPurchaseAmountInput() {
    $('.purchase-amount-input').value = '';
  }

  initWinningLottoInput() {
    $$('.winning-number-input').forEach((input) => (input.value = ''));
    $('.bonus-number-input').value = '';
  }

  showAlert(message) {
    alert(message);
  }
}
