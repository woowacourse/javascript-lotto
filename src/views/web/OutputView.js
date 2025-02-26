import { createTag, getByClass, getById } from '../../utils/DOM.js';
import WinningInput from './components/WinningInput.js';
import BonusInput from './components/BonusInput.js';

const OutputView = {
  show($target) {
    $target.classList.remove('hidden');
  },

  disable(className) {
    const $target = getById(className);
    $target.disabled = true;
  },

  createContainer(tag, { padding, margin }) {
    const $container = createTag(tag);

    if (padding) $container.style.padding = padding;
    if (margin) $container.style.margin = margin;

    return $container;
  },

  printPurchaseLottos(lottoCount, lottos) {
    const $lottoList = getByClass('lottoList')[0];
    const $lottoCountDescDiv = this.createContainer('div', { padding: '1rem 0' });
    $lottoCountDescDiv.textContent = `총 ${lottoCount}개를 구매하였습니다.`;
    $lottoList.appendChild($lottoCountDescDiv);

    this.printLottos(lottos, $lottoList);

    const $hiddenContainer = getByClass('hiddenContainer')[0];
    this.show($hiddenContainer);
    this.disablePurchase();
    this.generateWinningAndBonusInput();
  },

  printLottos(lottos, $target) {
    const $lottoListDiv = this.createContainer('div', {});
    $lottoListDiv.classList.add('lottoListContainer');
    const $lottoListUl = this.createContainer('ul', { padding: '0.5rem 0' });
    $lottoListUl.classList.add('lottoContainer');

    lottos.forEach((lotto) => {
      this.makeLotto($lottoListUl, lotto.numbers);
    });

    $lottoListDiv.appendChild($lottoListUl);
    $target.appendChild($lottoListDiv);
  },

  generateWinningAndBonusInput() {
    const $winningNumbersInput = getByClass('winningNumbersInput')[0];
    WinningInput($winningNumbersInput);
    BonusInput($winningNumbersInput);
  },

  makeLotto($lottoListDiv, lotto) {
    const $lottoDiv = createTag('li');
    $lottoDiv.classList.add('lottoItem');

    const $imoji = createTag('span');
    $imoji.textContent = '🎟️';
    $imoji.classList.add('lottoImoji');

    const $lottoText = document.createTextNode(`${lotto.join(', ')}`);

    $lottoDiv.appendChild($imoji);
    $lottoDiv.appendChild($lottoText);
    $lottoListDiv.appendChild($lottoDiv);
  },

  disablePurchase() {
    this.disable('purchaseInput');
    this.disable('purchaseButton');
  },
};

export default OutputView;
