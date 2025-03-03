import createElement from './utils/createElement.js';
import toggleClassName from './utils/toggleClassName.js';

const LottoResultView = {
  toggleModal() {
    const $modal = document.querySelector('.modal');
    const $modalDimmed = document.querySelector('.modal-dimmed');
    toggleClassName($modal, 'hidden');
    toggleClassName($modalDimmed, 'hidden');
  },
  renderStatisticsResult(rankResult) {
    const parent = document.querySelector('.modal-item-container');
    Object.keys(rankResult).forEach((key) => {
      const row = this.createStatisticsRow(rankResult[key]);
      parent.appendChild(row);
    });
  },
  createStatisticsRow({ name, price, count }) {
    const row = createElement('tr', '');
    row.classList.add('modal-items');

    const elementName = createElement('td', name === '5+1' ? '5개+보너스불' : `${name}개`);
    const elementPrice = createElement('td', `${price.toLocaleString()}`);
    const elementCount = createElement('td', `${count}개`);

    row.appendChild(elementName);
    row.appendChild(elementPrice);
    row.appendChild(elementCount);

    return row;
  },
  renderRevenueRate(revenueRate) {
    const $boldText = document.querySelector('.bold-text');
    const $element = createElement('p', `당신의 총 수익률은 ${revenueRate}% 입니다`);
    $boldText.appendChild($element);
    $element.classList.add('modal-items');
  },
};

export default LottoResultView;
