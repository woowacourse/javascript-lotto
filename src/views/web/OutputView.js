import {
  createContainer,
  createTag,
  disableElement,
  enableElement,
  getByClass,
  getById,
  getByTag,
  hideElement,
  showElement,
} from './utils/dom.js';
import WinningInput from './components/WinningInput.js';
import BonusInput from './components/BonusInput.js';
import LottoResultModal from './components/LottoResultModal.js';

const OutputView = {
  $hiddenContainer: getByClass('hiddenContainer')[0],
  $lottoList: getByClass('lottoList')[0],

  printPurchaseLottos(lottoCount, lottos) {
    const $lottoCountDescDiv = createContainer('div', { padding: '1rem 0' });
    $lottoCountDescDiv.textContent = `총 ${lottoCount}개를 구매하였습니다.`;
    this.$lottoList.appendChild($lottoCountDescDiv);

    this.printLottos(lottos, this.$lottoList);
    this.processAfterPurchase();
  },

  printLottos(lottos, $target) {
    const $lottoListDiv = createContainer('div', {});
    $lottoListDiv.classList.add('lottoListContainer');
    const $lottoListUl = createContainer('ul', { padding: '0.5rem 0' });
    $lottoListUl.classList.add('lottoContainer');

    lottos.forEach((lotto) => {
      this.makeLotto($lottoListUl, lotto.numbers);
    });

    $lottoListDiv.appendChild($lottoListUl);
    $target.appendChild($lottoListDiv);
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

  processAfterPurchase() {
    showElement(this.$hiddenContainer);
    this.disablePurchase();
    this.generateWinningAndBonusInput();
  },

  disablePurchase() {
    disableElement('purchaseInput');
    disableElement('purchaseButton');
    getById('purchaseButton').classList.add('disabled');
  },

  generateWinningAndBonusInput() {
    const $winningNumbersInput = getByClass('winningNumbersInput')[0];
    WinningInput.appendWinningInput($winningNumbersInput);
    BonusInput.appendBonusInput($winningNumbersInput);
  },

  showModal(winningCounts, profitRate) {
    LottoResultModal.createTable(winningCounts);
    LottoResultModal.createProfit(profitRate);
    LottoResultModal.openModal();
  },

  resetLottoUI() {
    LottoResultModal.closeModal();
    hideElement(this.$hiddenContainer);
    this.enablePurchase();
    this.$lottoList.replaceChildren();
    getByClass('winningNumbersInput')[0].replaceChildren();
    getByTag('tbody')[0].replaceChildren();
  },

  enablePurchase() {
    enableElement('purchaseInput');
    enableElement('purchaseButton');
    getById('purchaseButton').classList.remove('disabled');
  },
};

export default OutputView;
