import { LOTTO_COUNT, PROFIT } from '../../../constants/CONFIGURATIONS.js';
import { createTag, getByClass, querySelector } from '../../../utils/DOM.js';

const LottoResultModal = {
  $modalContainer: getByClass('modalContainer')[0],

  // 이벤트 등록
  initializeEvent() {
    this.addClickListener('resultButton', () => this.openModal());
    this.addClickListener('closeButton', () => this.closeModal());
    this.addClickListener('resetButton', () => {
      this.closeModal();
      this.resetLotto();
    });
  },

  addClickListener(className, callback) {
    const $target = getByClass(className)[0];
    $target.addEventListener('click', callback);
  },

  // 로또 내부 테이블 생성
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

  // 게임 재시작 로직
  resetLotto() {
    console.log('재시작');
  },
};

export default LottoResultModal;
