const $lottoList = document.getElementById('purchased-lotto-list');
const $lottoCount = document.getElementById('purchased-lotto-count');
const $winningLottoSection = document.getElementById('winning-lotto-section');
const $resultModalSection = document.getElementById('result-modal-section');
const $modalBackground = document.getElementsByClassName('modal-background')[0];
const $winningCountCells = document.getElementsByClassName('winning-count-cell');
const $yieldRate = document.getElementById('yield-rate');

const LottoListView = {
  showLottoList(lottos) {
    $lottoCount.innerHTML = `총 ${lottos.length}개를 구매했습니다.`;
    $lottoList.innerHTML = '';
    lottos.forEach((lotto) => {
      $lottoList.innerHTML += `<li class="purchased-lotto-numbers"><span class="purchased-lotto-icon">🎟️</span> ${[
        ...lotto._numbers,
      ]
        .sort((a, b) => a - b)
        .join(', ')}</li>`;
    });
    $winningLottoSection.style.display = 'block';
  },

  showResult(result, yieldRate) {
    $modalBackground.style.display = 'flex';
    $resultModalSection.style.display = 'flex';
    const ascendingWinningCounts = Object.values(result).reverse();
    Array.prototype.forEach.call($winningCountCells, (cell) => {
      cell.innerHTML = `${ascendingWinningCounts.shift()}개`;
    });
    $yieldRate.innerHTML = `당신의 총 수익률은 ${yieldRate}%입니다.`;
  },

  closeResult() {
    $modalBackground.style.display = 'none';
    $resultModalSection.style.display = 'none';
  },
};

export default LottoListView;
