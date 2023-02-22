import { $ } from '../utils/dom.js';

export default class View {
  onClickPurchaseAmountSubmitButton(callback) {
    $('.purchase-amount-submit-button').addEventListener('click', callback);
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

  showAlert(message) {
    alert(message);
  }
}
