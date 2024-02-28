class PurchaseAmount {
  render() {
    return `
      <div class="purchase-amount">
        <h3 class="purchase-amount__title">구입할 금액을 입력해주세요.</h3>
        <div class="purchase-amount__content">
          <input
            type="text"
            class="input purchase-amount__content__input"
            placeholder="금액"
          />
          <button class="button--primary purchase-amount__content__button">
            구입
          </button>
        </div>
      </div>
    `;
  }
}

class PurchasedLottoes {
  render() {
    return `
      <div class="purchased-lottoes">
        <h3>총 7개를 구매하였습니다.</h3>
        <div class="purchased-lottoes__content">
          <div class="purchased-lottoes__content__item">
            <span class="purchased-lottoes__content__item__emoji">🎟️</span>
            <span>12, 19, 22, 23, 28, 37</span>
          </div>
          <div class="purchased-lottoes__content__item">
            <span class="purchased-lottoes__content__item__emoji">🎟️</span>
            <span>12, 19, 22, 23, 28, 37</span>
          </div>
          <div class="purchased-lottoes__content__item">
            <span class="purchased-lottoes__content__item__emoji">🎟️</span>
            <span>12, 19, 22, 23, 28, 37</span>
          </div>
          <div class="purchased-lottoes__content__item">
            <span class="purchased-lottoes__content__item__emoji">🎟️</span>
            <span>12, 19, 22, 23, 28, 37</span>
          </div>
          <div class="purchased-lottoes__content__item">
            <span class="purchased-lottoes__content__item__emoji">🎟️</span>
            <span>12, 19, 22, 23, 28, 37</span>
          </div>
          <div class="purchased-lottoes__content__item">
            <span class="purchased-lottoes__content__item__emoji">🎟️</span>
            <span>12, 19, 22, 23, 28, 37</span>
          </div>
          <div class="purchased-lottoes__content__item">
            <span class="purchased-lottoes__content__item__emoji">🎟️</span>
            <span>12, 19, 22, 23, 28, 37</span>
          </div>
          <div class="purchased-lottoes__content__item">
            <span class="purchased-lottoes__content__item__emoji">🎟️</span>
            <span>12, 19, 22, 23, 28, 37</span>
          </div>
        </div>
      </div>
    `;
  }
}

class WinningLotto {
  render() {
    return `
      <div class="winning-lotto">
        <h3>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</h3>
        <div class="winning-lotto__content">
          <div class="winning-lotto__content__winning-numbers">
            <h4>당첨 번호</h4>
            <div>
              <input class="input winning-lotto__input" type="text" />
              <input class="input winning-lotto__input" type="text" />
              <input class="input winning-lotto__input" type="text" />
              <input class="input winning-lotto__input" type="text" />
              <input class="input winning-lotto__input" type="text" />
              <input class="input winning-lotto__input" type="text" />
            </div>
          </div>
          <div class="winning-lotto__content__bonus-number">
            <h4>보너스 번호</h4>
            <input class="input winning-lotto__input" type="text" />
          </div>
        </div>
      </div>
    `;
  }
}

class CheckResultButton {
  render() {
    return `
      <button class="button--primary">결과 확인하기</button>
    `;
  }
}

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

class LottoGame {
  #purchaseAmount;
  #purchasedLottoes;
  #winningLotto;
  #checkResultButton;
  #resultModal;

  #state;

  constructor() {
    this.#purchaseAmount = new PurchaseAmount();
    this.#purchasedLottoes = new PurchasedLottoes();
    this.#winningLotto = new WinningLotto();
    this.#checkResultButton = new CheckResultButton();
    this.#resultModal = new ResultModal();

    this.#state = { isModalOpen: false };
  }

  render() {
    return `
    <main>
      <article>
        <h1 class="lotto-game__title">🎱 내 번호 당첨 확인 🎱</h1>
        ${this.#purchaseAmount.render()}
        ${this.#purchasedLottoes.render()}
        ${this.#winningLotto.render()}
        ${this.#checkResultButton.render()}
        ${this.#resultModal.render()}
      </article>
    </main>
    `;
  }
}

class LottoGameLayout {
  #lottoGame;

  constructor() {
    this.#lottoGame = new LottoGame();
  }

  render() {
    return `
      <header><h1>🎱 행운의 로또</h1></header>
      ${this.#lottoGame.render()}
      <footer><p>Copyright 2023. woowacourse</p></footer>
    `;
  }
}

class App {
  /**
   * @type {HTMLDivElement}
   */
  #root;

  constructor(root) {
    this.#root = root;
  }

  init() {
    const layout = new LottoGameLayout();
    this.#root.innerHTML = layout.render();
  }
}

export default App;
