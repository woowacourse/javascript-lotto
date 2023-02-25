const $resultModalSection = document.getElementById('result-modal-section');
const $modalBackground = document.getElementsByClassName('modal-background')[0];
const $winningCountCells = document.getElementsByClassName('winning-count-cell');
const $yieldRate = document.getElementById('yield-rate');

const ResultView = {
  showResult(result, yieldRate) {
    $modalBackground.style.display = 'flex';
    $resultModalSection.style.display = 'flex';

    const ascendingWinningCounts = Object.values(result).reverse();
    Array.from($winningCountCells).forEach((cell) => {
      cell.textContent = `${ascendingWinningCounts.shift()}개`;
    });
    $yieldRate.textContent = `당신의 총 수익률은 ${yieldRate}%입니다.`;
  },

  hideResult() {
    $modalBackground.style.display = 'none';
    $resultModalSection.style.display = 'none';
  },
};

export default ResultView;
