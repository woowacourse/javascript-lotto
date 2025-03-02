import { LOTTO_PRIZE_DEFINITION } from '../../Domain/Constant/Definition.js';

class LottoGameView {
  #state;

  constructor(state) {
    this.#state = state;
    this.#state.subscribe(this);
    this.#initializeModalEvents();
  }

  #initializeModalEvents() {
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalCancelButton = document.querySelector('.modal-cancle-container');

    if (modalOverlay && modalCancelButton) {
      modalOverlay.addEventListener('click', (event) => {
        if (event.target === modalOverlay) {
          modalOverlay.style.visibility = 'hidden';
        }
      });

      modalCancelButton.addEventListener('click', () => {
        modalOverlay.style.visibility = 'hidden';
      });
    }
  }

  update(updateType) {
    switch (updateType) {
      case 'LOTTO_PURCHASE':
        this.renderLottoList();
        break;
      case 'LOTTO_RESULT':
        this.renderWinningResult();
        break;
      case 'RESET':
        this.resetView();
        break;
    }
  }

  renderLottoList() {
    const lottoListSection = document.querySelector('.lotto-list-section');
    const lottoCountText = lottoListSection.querySelector('.text-body');
    const lottoList = lottoListSection.querySelector('.lotto-numbers-list');
    const purchaseInput = document.querySelector('.purchase-input');
    const purchaseButton = document.querySelector('.purchase-button');

    purchaseInput.disabled = true;
    purchaseButton.disabled = true;

    lottoCountText.textContent = `총 ${this.#state.getLottoTickets()}개를 구매하였습니다.`;

    lottoList.innerHTML = this.#state
      .getLottoNumbers()
      .map(
        (lotto) => `
        <li class="lotto-number-item">
          <p class="text-ticket-icon">🎟️</p>
          <p class="text-body">${lotto.getNumbers().join(', ')}</p>
        </li>
      `
      )
      .join('');

    lottoListSection.style.visibility = 'visible';
    document.querySelector('.winning-numbers-section').style.visibility =
      'visible';
  }

  renderWinningResult() {
    const modalOverlay = document.querySelector('.modal-overlay');
    const tbody = document.querySelector('.result-table tbody');
    const profitText = document.querySelector('.profit-text');

    if (!modalOverlay || !tbody || !profitText) {
      console.error('Modal elements not found');
      return;
    }

    const lottoResult = this.#state.getLottoResult();
    if (!lottoResult) {
      console.error('Lotto result not found');
      return;
    }

    const rows = tbody.querySelectorAll('tr');

    const prizeOrder = [
      LOTTO_PRIZE_DEFINITION.FIFTH_PRIZE, // 3개 일치
      LOTTO_PRIZE_DEFINITION.FOURTH_PRIZE, // 4개 일치
      LOTTO_PRIZE_DEFINITION.THIRD_PRIZE, // 5개 일치
      LOTTO_PRIZE_DEFINITION.SECOND_PRIZE, // 5개+보너스볼
      LOTTO_PRIZE_DEFINITION.FIRST_PRIZE, // 6개 일치
    ];

    prizeOrder.forEach((prize, index) => {
      if (rows[index]) {
        const countCell = rows[index].querySelector('td:last-child');
        if (countCell) {
          countCell.textContent = `${lottoResult[prize]}개`;
        }
      }
    });

    const profitRate = this.#state.getProfitRate();
    profitText.textContent = `당신의 총 수익률은 ${profitRate === 0 ? '0' : profitRate.toFixed(1)}%입니다.`;

    modalOverlay.style.visibility = 'visible';
  }

  resetView() {
    const modalOverlay = document.querySelector('.modal-overlay');
    const lottoListSection = document.querySelector('.lotto-list-section');
    const winningNumbersSection = document.querySelector(
      '.winning-numbers-section'
    );
    const purchaseInput = document.querySelector('.purchase-input');
    const purchaseButton = document.querySelector('.purchase-button');

    purchaseInput.disabled = false;
    purchaseButton.disabled = false;

    modalOverlay.style.visibility = 'hidden';
    lottoListSection.style.visibility = 'hidden';
    winningNumbersSection.style.visibility = 'hidden';

    purchaseInput.value = '';
    document
      .querySelectorAll('.numbers-input')
      .forEach((input) => (input.value = ''));
  }
}

export default LottoGameView;
