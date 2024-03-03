import BudgetController from "./BudgetController.js";
import IssuedLottoController from "./IssuedLottoController.js";
import WinningLottoController from "./WinningLottoController.js";

class MainController {
  #budgetController = null;
  #issuedLottoController = null;

  constructor() {
    this.#setBudget();
  }

  #setBudget() {
    this.#budgetController = new BudgetController(
      this.#playLottoGame.bind(this)
    );
  }

  #playLottoGame() {
    // 로또 발행
    this.#issuedLottoController = new IssuedLottoController(
      this.#budgetController.getLottoCount()
    );
    this.#issuedLottoController.printIssuedLottoDiv();

    // 우승 로또 데이터 설정
    const winningLottoController = new WinningLottoController(
      this.#issuedLottoController.getIssuedLottos(),
      this.#setModalBtnsClickHandler.bind(this)
    );
  }

  #setModalCloseBtnClickHandler() {
    const modalCloseBtn = document.querySelector(".modal-close-btn");
    modalCloseBtn.addEventListener("click", () => {
      document.querySelector(".modal-section").remove();
    });
  }

  #setRetryBtnClickHandler() {
    const retryBtn = document.querySelector(".retry-btn");
    retryBtn.addEventListener("click", () => {
      location.reload();
    });
  }

  #setModalBtnsClickHandler() {
    this.#setModalCloseBtnClickHandler();
    this.#setRetryBtnClickHandler();
  }
}

export default MainController;
