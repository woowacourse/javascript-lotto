import {
  createContainer,
  createTag,
  disableElement,
  enableElement,
  getById,
  getByTag,
  hideElement,
  querySelector,
  showElement,
} from './utils/dom.js';
import WinningInput from './components/WinningInput.js';
import BonusInput from './components/BonusInput.js';
import LottoResultModal from './components/LottoResultModal.js';

const OutputView = {
  $hiddenContainer: querySelector('.hiddenContainer'),
  $lottoList: querySelector('.lottoList'),
  $winningNumbersInput: querySelector('.winningNumbersInput'),

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

    const fragment = new DocumentFragment();
    lottos.forEach((lotto) => {
      fragment.appendChild(this.makeLotto(lotto.numbers));
    });
    $lottoListUl.appendChild(fragment);
    $lottoListDiv.appendChild($lottoListUl);
    $target.appendChild($lottoListDiv);
  },

  makeLotto(lotto) {
    const $lottoDiv = createTag('li');
    $lottoDiv.classList.add('lottoItem');

    const $imoji = createTag('span');
    $imoji.textContent = '🎟️';
    $imoji.classList.add('lottoImoji');

    const $lottoText = document.createTextNode(`${lotto.join(', ')}`);

    $lottoDiv.appendChild($imoji);
    $lottoDiv.appendChild($lottoText);
    return $lottoDiv;
  },

  processAfterPurchase() {
    showElement(this.$hiddenContainer);
    this.togglePurchase(false);
    this.generateWinningAndBonusInput();
  },

  generateWinningAndBonusInput() {
    WinningInput.appendWinningInput(this.$winningNumbersInput);
    BonusInput.appendBonusInput(this.$winningNumbersInput);
  },

  showModal(winningCounts, profitRate) {
    LottoResultModal.createTable(winningCounts);
    LottoResultModal.createProfit(profitRate);
    LottoResultModal.openModal();
  },

  resetLottoUI() {
    LottoResultModal.closeModal();
    hideElement(this.$hiddenContainer);
    this.togglePurchase(true);
    this.$lottoList.replaceChildren();
    this.$winningNumbersInput.replaceChildren();
    getByTag('tbody')[0].replaceChildren();
  },

  togglePurchase(isEnabled) {
    const action = isEnabled ? enableElement : disableElement;
    action('purchaseInput');
    action('purchaseButton');

    if (isEnabled) {
      getById('purchaseButton').classList.remove('disabled');
    } else {
      getById('purchaseButton').classList.add('disabled');
    }
  },
};

export default OutputView;
