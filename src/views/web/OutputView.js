import {
  createContainer,
  createTag,
  disableElement,
  getByClass,
  showElement,
} from '../../utils/DOM.js';
import WinningInput from './components/WinningInput.js';
import BonusInput from './components/BonusInput.js';
import LottoResultModal from './components/LottoResultModal.js';

const OutputView = {
  printPurchaseLottos(lottoCount, lottos) {
    const $lottoList = getByClass('lottoList')[0];
    const $lottoCountDescDiv = createContainer('div', { padding: '1rem 0' });
    $lottoCountDescDiv.textContent = `총 ${lottoCount}개를 구매하였습니다.`;
    $lottoList.appendChild($lottoCountDescDiv);

    this.printLottos(lottos, $lottoList);

    const $hiddenContainer = getByClass('hiddenContainer')[0];
    showElement($hiddenContainer);
    this.disablePurchase();
    this.generateWinningAndBonusInput();
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

  disablePurchase() {
    disableElement('purchaseInput');
    disableElement('purchaseButton');
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
};

export default OutputView;
