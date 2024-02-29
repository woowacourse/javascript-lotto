class ResultModal {
  render() {
    return `
      <div class="modal-wrapper">
        <div class="modal">
          <button class="modal__button--close">X</button>
          <div class="modal__body">
            <h2 class="modal__body__title">🏆 당첨 통계 🏆</h2>
            <div class="modal__body__content">
              <div class="modal__body__content__table">
                <div class="modal__body__content__table__row">
                  <span class="modal__body__content__table__cell"
                    >일치 갯수</span
                  >
                  <span class="modal__body__content__table__cell">당첨금</span>
                  <span class="modal__body__content__table__cell"
                    >당첨 갯수</span
                  >
                </div>
                <div class="modal__body__content__table__row">
                  <span class="modal__body__content__table__cell">3개</span>
                  <span class="modal__body__content__table__cell">5,000</span>
                  <span class="modal__body__content__table__cell">n개</span>
                </div>
                <div class="modal__body__content__table__row">
                  <span class="modal__body__content__table__cell">4개</span>
                  <span class="modal__body__content__table__cell">50,000</span>
                  <span class="modal__body__content__table__cell">n개</span>
                </div>
                <div class="modal__body__content__table__row">
                  <span class="modal__body__content__table__cell">5개</span>
                  <span class="modal__body__content__table__cell">
                    1,500,000
                  </span>
                  <span class="modal__body__content__table__cell">n개</span>
                </div>
                <div class="modal__body__content__table__row">
                  <span class="modal__body__content__table__cell">
                    5개+보너스볼
                  </span>
                  <span class="modal__body__content__table__cell">
                    30,000,000
                  </span>
                  <span class="modal__body__content__table__cell">n개</span>
                </div>
                <div class="modal__body__content__table__row">
                  <span class="modal__body__content__table__cell">6개</span>
                  <span class="modal__body__content__table__cell">
                    2,000,000,000
                  </span>
                  <span class="modal__body__content__table__cell">n개</span>
                </div>
              </div>
              <div class="modal__body__content__profit-rate">
                당신의 총 수익률은 %입니다.
              </div>
            </div>
            <button class="modal__body__button button--primary">
              다시 시작하기
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

export default ResultModal;
