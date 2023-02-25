const $lottoList = document.getElementById('purchased-lotto-list');
const $lottoCount = document.getElementById('purchased-lotto-count');
const $winningLottoSection = document.getElementById('winning-lotto-section');
const $budgetInputForm = document.getElementById('budget-input-form');
const $winningNumberInputForm = document.getElementById('winning-number-input-form');

const LottoListView = {
  showLottoList(lottos) {
    $winningLottoSection.style.display = 'block';
    $lottoCount.innerHTML = `총 ${lottos.length}개를 구매했습니다.`;
    $lottoList.innerHTML = lottos
      .map((lotto) => {
        return `<li class="purchased-lotto-numbers"><span class="purchased-lotto-icon">🎟️</span> ${[
          ...lotto._numbers,
        ]
          .sort((a, b) => a - b)
          .join(', ')}</li>`;
      })
      .join('');
  },

  hideLottoList() {
    $budgetInputForm.reset();
    $winningNumberInputForm.reset();
    $lottoCount.innerHTML = null;
    $lottoList.innerHTML = null;
    $winningLottoSection.style.display = 'none';
  },
};

export default LottoListView;
