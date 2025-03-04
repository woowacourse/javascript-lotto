import { LOTTO_COUNT, PROFIT } from '../../../constants/CONFIGURATIONS.js';
import { createTag, getByClass, querySelector } from '../utils/dom.js';

const LottoResultModal = {
  $modalContainer: getByClass('modalContainer')[0],

  createTable(winningCounts) {
    const $tableBody = querySelector('.lottoResultTable > tbody');

    const $fragment = new DocumentFragment();
    winningCounts.forEach((count, idx) => {
      const $tr = createTag('tr');
      const { $matchCount, $winningMoney, $winningCount } = this.createRow(count, idx);
      $tr.appendChild($matchCount);
      $tr.appendChild($winningMoney);
      $tr.appendChild($winningCount);
      $fragment.appendChild($tr);
    });

    $tableBody.appendChild($fragment);
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
    querySelector('.lottoResultTable > tbody').replaceChildren();
  },
};

export default LottoResultModal;
