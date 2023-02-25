const $lottoList = document.getElementById('purchased-lotto-list');
const $lottoCount = document.getElementById('purchased-lotto-count');
const $winningLottoSection = document.getElementById('winning-lotto-section');
const $purchasedLottoSection = document.getElementById('purchased-lotto-section');
const $budgetInputForm = document.getElementById('budget-input-form');
const $winningNumberInputForm = document.getElementById('winning-number-input-form');

const LottoListView = {
  render(lottos) {
    $lottoCount.textContent = `총 ${lottos.length}개를 구매했습니다.`;
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

  show() {
    $purchasedLottoSection.classList.remove('hide');
    $winningLottoSection.classList.remove('hide');
  },

  reset() {
    $budgetInputForm.reset();
    $winningNumberInputForm.reset();
  },

  hide() {
    $purchasedLottoSection.classList.add('hide');
    $winningLottoSection.classList.add('hide');
  },
};

export default LottoListView;
