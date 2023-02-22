import { $ } from '../utils/dom.js';
import { LOTTO_PRIZE_MONEY, PRIZE_MATCH_COUNT } from '../constants/condition.js';

export default class View {
  onClickPurchaseAmountSubmitButton(callback) {
    $('.purchase-amount-submit-button').addEventListener('click', callback);
  }

  onClickWinningLottoSubmitButton(callback) {
    $('.winning-lotto-submit-button').addEventListener('click', callback);
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

  disableElements(...elements) {
    elements.forEach((element) => {
      $(element).disabled = true;
    });
  }

  showElements(...elements) {
    elements.forEach((element) => {
      $(element).classList.remove('hide');
    });
  }

  showAlert(message) {
    alert(message);
  }
}
