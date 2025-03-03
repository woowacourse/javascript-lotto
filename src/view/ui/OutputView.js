/* eslint-disable max-lines-per-function */
import toggleClassName from './utils/toggleClassName';
import createElement from './utils/createElement';

const OutputView = {
  toggleModal() {
    const $modal = document.querySelector('.modal');
    const $modalDimmed = document.querySelector('.modal-dimmed');
    toggleClassName($modal, 'modal-close');
    toggleClassName($modalDimmed, 'modal-close');
  },
  printUserLottos(userLottos) {
    userLottos.forEach((userLotto) => {
      const $parent = document.querySelector('.lotto-item-container');
      const $element = createElement('p', `🎟️ ${userLotto.getNumbers().join(', ')}`);
      $parent.appendChild($element);
    });
  },
  printStatisticsResult(rankResult) {
    this.toggleModal();

    Object.keys(rankResult).forEach((key) => {
      const { name, price, count } = rankResult[key];

      const parent = document.querySelector('.modal-item-container');
      const child = createElement('tr', '');
      child.classList.add('modal-items');
      parent.appendChild(child);
      let elementName = createElement('td', `${name}개`);

      if (name === '5+1') {
        elementName = createElement('td', '5개+보너스볼');
      }

      child.appendChild(elementName);
      const elementPrice = createElement('td', `${price.toLocaleString()}원`);
      child.appendChild(elementPrice);
      const elementCount = createElement('td', `${count}개`);
      child.appendChild(elementCount);
    });
  },
  printRevenueRate(revenueRate) {
    const $boldText = document.querySelector('.bold-text');
    const $element = createElement('p', `당신의 총 수익률은 ${revenueRate}% 입니다`);
    $boldText.appendChild($element);
    $element.classList.add('modal-items');
  },
};

export default OutputView;
