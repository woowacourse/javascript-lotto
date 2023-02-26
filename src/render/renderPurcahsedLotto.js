import { $ } from '../dom/dom';

const renderPurchasedLotto = (lottosNumbers) => {
  $('#purchase-lotto').innerHTML = `
    <div class="text" id="lottos-count">총 ${lottosNumbers.length}개를 구매하였습니다.</div>
    <ul>
        ${lottosNumbers
          .map((lottoNumbers) => {
            return `
            <li>
                <div id="lotto-emoji">🎟️</div>
                <div class="text">${lottoNumbers.join(', ')}</div>
            </li>`;
          })
          .join('')}
    </ul>
  `;
};

export default renderPurchasedLotto;
