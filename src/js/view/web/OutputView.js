const $lottoList = document.getElementById('purchased-lotto-list');
const $lottoCount = document.getElementById('purchased-lotto-count');
const $winningLottoSection = document.getElementById('winning-lotto-section');
const $resultModalSection = document.getElementById('result-modal-section');
const $modalBackground = document.getElementsByClassName('modal-background')[0];
const $winningCountCells = document.getElementsByClassName('winning-count-cell');
const $yieldRate = document.getElementById('yield-rate');
const $budgetInputForm = document.getElementById('budget-input-form');
const $winningNumberInputForm = document.getElementById('winning-number-input-form');

const LottoListView = {
  showLottoList(lottos) {
    $winningLottoSection.style.display = 'block';
    $lottoCount.innerHTML = `총 ${lottos.length}개를 구매했습니다.`;
    $lottoList.innerHTML = '';
    lottos.forEach((lotto) => {
      $lottoList.innerHTML += `<li class="purchased-lotto-numbers"><span class="purchased-lotto-icon">🎟️</span> ${[
        ...lotto._numbers,
      ]
        .sort((a, b) => a - b)
        .join(', ')}</li>`;
    });
  },

  hideLottoList() {
    $budgetInputForm.reset();
    $winningNumberInputForm.reset();
    $lottoCount.innerHTML = null;
    $lottoList.innerHTML = null;
    $winningLottoSection.style.display = 'none';
  },

  showResult(result, yieldRate) {
    $modalBackground.style.display = 'flex';
    $resultModalSection.style.display = 'flex';

    const ascendingWinningCounts = Object.values(result).reverse();
    Array.from($winningCountCells).forEach((cell) => {
      cell.innerHTML = `${ascendingWinningCounts.shift()}개`;
    });
    $yieldRate.innerHTML = `당신의 총 수익률은 ${yieldRate}%입니다.`;
  },

  hideResult() {
    $modalBackground.style.display = 'none';
    $resultModalSection.style.display = 'none';
  },
};

export default LottoListView;
