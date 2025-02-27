import { LOTTO_COUNT, PROFIT } from '../../../constants/CONFIGURATIONS.js';
import WebController from '../../../controllers/WebController.js';
import {
  createTag,
  enableElement,
  getByClass,
  getById,
  getByTag,
  hideElement,
  querySelector,
} from '../../../utils/DOM.js';

const LottoResultModal = {
  $modalContainer: getByClass('modalContainer')[0],

  initializeEvent() {
    this.addClickListener('resultButton', () => this.openModal());
    this.addClickListener('closeButton', () => this.closeModal());
    this.addClickListener('modalBackground', () => this.closeModal());
    this.addClickListener('resetButton', () => {
      this.closeModal();
      this.resetLotto();
      WebController.start();
    });
  },

  addClickListener(className, callback) {
    const $target = getByClass(className)[0];
    $target.addEventListener('click', callback);
  },

  createTable(winningCounts) {
    const $tableBody = querySelector('.lottoResultTable > tbody');

    winningCounts.forEach((count, idx) => {
      const $tr = createTag('tr');
      const { $matchCount, $winningMoney, $winningCount } = this.createRow(count, idx);

      $tr.appendChild($matchCount);
      $tr.appendChild($winningMoney);
      $tr.appendChild($winningCount);

      $tableBody.appendChild($tr);
    });
  },

  createRow(count, idx) {
    const $matchCount = createTag('td');
    $matchCount.textContent = `${LOTTO_COUNT[idx]}개`;
    if (idx === 3) $matchCount.textContent += '+보너스볼';

    const $winningMoney = createTag('td');
    $winningMoney.textContent = `${PROFIT[idx].toLocaleString()}`;

    const $winningCount = createTag('td');
    $winningCount.textContent = `${count}개`;

    return { $matchCount, $winningMoney, $winningCount };
  },

  createProfit(profit) {
    const $profitText = getByClass('profitText')[0];
    $profitText.textContent = `당신의 총 수익률은 ${profit.toFixed(1).toLocaleString()}%입니다.`;
  },

  openModal() {
    this.$modalContainer.classList.remove('hidden');
  },

  closeModal() {
    this.$modalContainer.classList.add('hidden');
  },

  resetLotto() {
    getById('purchaseInput').value = '';
    getByClass('lottoList')[0].replaceChildren();
    getByClass('winningNumbersInput')[0].replaceChildren();
    getByTag('tbody')[0].replaceChildren();

    enableElement('purchaseInput');
    enableElement('purchaseButton');
    hideElement(getByClass('hiddenContainer')[0]);
  },
};

export default LottoResultModal;
