import { LOTTO_PRIZE_DEFINITION } from '../../Domain/Constant/definition.js';

class LottoGameView {
  #state;
  #modalOverlay;
  #lottoListSection;
  #winningNumbersSection;
  #purchaseInput;
  #purchaseButton;
  #lottoCountText;
  #lottoList;
  #tbody;
  #profitText;

  constructor(state) {
    this.#state = state;
    this.#state.subscribe(this);

    // DOM 요소 초기화
    this.#modalOverlay = document.querySelector('.modal-overlay');
    this.#lottoListSection = document.querySelector('.lotto-list-section');
    this.#winningNumbersSection = document.querySelector(
      '.winning-numbers-section'
    );
    this.#purchaseInput = document.querySelector('.purchase-input');
    this.#purchaseButton = document.querySelector('.purchase-button');
    this.#lottoCountText = this.#lottoListSection.querySelector('.text-body');
    this.#lottoList = this.#lottoListSection.querySelector(
      '.lotto-numbers-list'
    );
    this.#tbody = document.querySelector('.result-table tbody');
    this.#profitText = document.querySelector('.profit-text');

    this.#initializeModalEvents();
  }

  #initializeModalEvents() {
    const modalCancelButton = document.querySelector('.modal-cancel-container');

    if (this.#modalOverlay && modalCancelButton) {
      this.#modalOverlay.addEventListener('click', (event) => {
        if (event.target === this.#modalOverlay) {
          this.#hideElement(this.#modalOverlay);
        }
      });

      modalCancelButton.addEventListener('click', () => {
        this.#hideElement(this.#modalOverlay);
      });
    }
  }

  #hideElement(element) {
    element.style.visibility = 'hidden';
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
    this.#purchaseInput.disabled = true;
    this.#purchaseButton.disabled = true;

    this.#lottoCountText.textContent = `총 ${this.#state.getLottoTickets()}개를 구매하였습니다.`;

    this.#lottoList.innerHTML = this.#state
      .getLottoNumbers()
      .map(this.#createLottoNumberTemplate)
      .join('');

    this.#lottoListSection.style.visibility = 'visible';
    this.#winningNumbersSection.style.visibility = 'visible';
  }

  #createLottoNumberTemplate = (lotto) => {
    return `
      <li class="lotto-number-item">
        <p class="text-ticket-icon">🎟️</p>
        <p class="text-body">${lotto.getNumbers().join(', ')}</p>
      </li>`;
  };

  renderWinningResult() {
    if (!this.#modalOverlay || !this.#tbody || !this.#profitText) {
      console.error('Modal elements not found');
      return;
    }

    const lottoResult = this.#state.getLottoResult();
    if (!lottoResult) {
      console.error('Lotto result not found');
      return;
    }

    const rows = this.#tbody.querySelectorAll('tr');

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
    this.#profitText.textContent = `당신의 총 수익률은 ${profitRate === 0 ? '0' : profitRate.toFixed(1)}%입니다.`;

    this.#modalOverlay.style.visibility = 'visible';
  }

  resetView() {
    this.#purchaseInput.disabled = false;
    this.#purchaseButton.disabled = false;

    this.#hideElement(this.#modalOverlay);
    this.#hideElement(this.#lottoListSection);
    this.#hideElement(this.#winningNumbersSection);

    this.#purchaseInput.value = '';
    document
      .querySelectorAll('.numbers-input')
      .forEach((input) => (input.value = ''));
  }
}

export default LottoGameView;
