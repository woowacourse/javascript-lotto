const $resultModalSection = document.getElementById('result-modal-section');
const $modalBackground = document.getElementById('modal-background-section');
const $winningCountCells = document.getElementsByClassName('winning-count-cell');
const $yieldRate = document.getElementById('yield-rate');

const ResultView = {
  render(result, yieldRate) {
    const ascendingWinningCounts = Object.values(result);
    Array.from($winningCountCells).forEach((cell) => {
      cell.textContent = `${ascendingWinningCounts.pop()}개`;
    });
    $yieldRate.textContent = `당신의 총 수익률은 ${yieldRate}%입니다.`;
  },

  show() {
    $modalBackground.classList.remove('hide');
    $resultModalSection.classList.remove('hide');
    $resultModalSection.focus();
  },

  hide() {
    $modalBackground.classList.add('hide');
    $resultModalSection.classList.add('hide');
  },
};

export default ResultView;
