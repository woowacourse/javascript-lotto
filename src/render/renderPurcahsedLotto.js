import { $ } from '../dom/dom';

const renderPurchasedLotto = (lottosNumbers) => {
  $('#purchase-lotto').innerHTML = `
    <div id="lottos-count">총 ${lottosNumbers.length}개를 구매하였습니다.</div>
    <ul>
        ${lottosNumbers
          .map((lottoNumbers) => {
            return `
            <li>
                <div id="lotto-emoji">🎟️</div>
                <div id="lotto-numbers">${lottoNumbers.join(', ')}</div>
            </li>`;
          })
          .join('')}
    </ul>
  `;
};

export default renderPurchasedLotto;
