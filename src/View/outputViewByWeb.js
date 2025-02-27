import { createModal } from './createDom';

export const outputViewByWeb = {
  displayLottoCount(lottoCounts) {
    const $p = document.createElement('p');
    $p.setAttribute('class', 'lotto-count-display');
    $p.textContent = `총 ${lottoCounts}개를 구매했습니다.`;
    document.querySelector('.lotto-list-display').appendChild($p);
  },
  displayLottoList(lottoNumbersList) {
    const fragment = document.createDocumentFragment();
    const $ul = document.createElement('ul');

    lottoNumbersList.forEach((lottoNumbers) => {
      const $li = document.createElement('li');
      $li.setAttribute('class', 'lotto');
      const $spanLottoTicket = document.createElement('span');
      $spanLottoTicket.setAttribute('class', 'lotto-ticket');
      $spanLottoTicket.textContent = '🎟️';

      const $spanLottoNumbers = document.createElement('span');
      $spanLottoNumbers.setAttribute('class', 'lotto-numbers');
      $spanLottoNumbers.textContent = `${lottoNumbers.join(', ')}`;
      $li.appendChild($spanLottoTicket);
      $li.appendChild($spanLottoNumbers);

      $ul.appendChild($li);
    });

    fragment.appendChild($ul);
    document.querySelector('.lotto-list-display').appendChild(fragment);
  },
  displayLottoResult(lottoResult, lottoProfit) {
    const $modal = createModal(lottoResult, lottoProfit);

    document.querySelector('#app').appendChild($modal);
  },

  displayErrorMessage(error) {
    alert(error.message);
  },
};
