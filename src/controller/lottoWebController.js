import "../styles/index.css";
import Lotto from "../domain/Lotto.js";
import lottoRankMaker from "../domain/lottoRankMaker.js";
import lottoResultMaker from "../domain/lottoResultMaker.js";
import profitCalculator from "../domain/profitCalculator.js";
import randomLottoArray from "../domain/randomLottoMaker.js";
import { $, $$ } from "../utils/querySelector.js";
import budgetValidation from "../validation/budgetValidation.js";
import commonInputValidation from "../validation/commonInputValidation.js";
import startValidation from "../validation/startValidation.js";
import winningLottoBonusValidation from "../validation/winningLottoBonusValidation.js";
import winningLottoNumbersValidation from "../validation/winningLottoNumbersValidation.js";
import winningLottoValidation from "../validation/winningLottoValidation.js";

class LottoWebController {
  #webIssuedLottoArray;
  #webBudget;

  async start() {
    $("#content-box-input-budget").addEventListener(
      "submit",
      this.handleWebBudget.bind(this)
    );
    $("#modal-close-btn").addEventListener("click", this.closeModal.bind());
    $("#modal-retry-btn").addEventListener("click", this.reloadTag.bind(this));
    $("#modal").addEventListener("click", this.closeModalOutside.bind(this));

    $("#content-box-input-combination").addEventListener(
      "submit",
      this.handleWebWinningCombinationInput.bind(this)
    );
  }

  getWebBudget() {
    const webBudgetInput = $("#budget").value;
    this.#webBudget = Number(webBudgetInput);
  }

  /**
   * 예산 입력 관리 및 유효성 검사
   * @param {event} e
   */
  handleWebBudget(event) {
    event.preventDefault();
    this.getWebBudget();
    try {
      startValidation(budgetValidation.categories, this.#webBudget);

      const webIssuedLottoCount = this.calculateWebIssuedLottoCount();

      $("#after-budget-invisible").id = "after-budget";
      const form = document.querySelector("#content-box-input-budget");
      const formInputs = form.querySelectorAll("input, button");

      formInputs.forEach((input) => {
        input.disabled = true;
      });
      this.handleWebIssuedLottoArray(webIssuedLottoCount);
    } catch (error) {
      return alert(error.message);
    }
  }

  calculateWebIssuedLottoCount() {
    const webLotto = new Lotto(this.#webBudget);
    const webIssuedLottoCount = webLotto.calculateIssuedLottoCount();
    $("#issued-lotto-count").innerHTML = webIssuedLottoCount;
    return webIssuedLottoCount;
  }

  handleWebIssuedLottoArray(webIssuedLottoCount) {
    this.#webIssuedLottoArray = randomLottoArray(webIssuedLottoCount);
    this.printWebIssuedLottoArray();
  }

  printWebIssuedLottoArray() {
    const curr = $("#content-box-lottos-msg");

    this.#webIssuedLottoArray.forEach((array) => {
      const lottoImoji = Object.assign(document.createElement("div"), {
        innerHTML: "🎟️",
        id: "lotto-imoji",
      });

      const issuedLottoDiv = Object.assign(document.createElement("div"), {
        innerHTML: array.join(", "),
        className: "lotto-body",
        id: "issued-lotto-div",
      });

      const issuedLotto = document.createElement("div");
      issuedLotto.id = "issued-lotto";
      issuedLotto.append(lottoImoji, issuedLottoDiv);

      curr.append(issuedLotto);
    });
  }

  removeWebIssuedLottoArray() {
    const issuedLottos = $$(".issued-lotto");
    issuedLottos.forEach((lotto) => lotto.remove());
  }

  removeWebWinningCombinationInput() {
    $$(".lotto-numbers-input").forEach((input) => (input.value = ""));
    $(".lotto-bonus-input").value = "";
  }

  /**
   * 당첨 번호 및 보너스 번호 입력값 관리
   */
  handleWebWinningCombinationInput(event) {
    event.preventDefault();
    const webWinningNumbersInput = Array.from({ length: 6 }, (_, index) => {
      return Number($$(".lotto-numbers-input")[index].value);
    });

    const webWinningBonusInput = Number($(".lotto-bonus-input").value);
    const webWinningCombination = {
      normalNumbers: webWinningNumbersInput,
      bonusNumber: webWinningBonusInput,
    };

    try {
      this.validateInput(
        winningLottoNumbersValidation.winningNumbers,
        webWinningNumbersInput
      );
      this.validateInput(
        winningLottoBonusValidation.winningBonus,
        webWinningCombination
      );

      this.calculateWebLottoResult(webWinningCombination);
      this.openModal();
    } catch (error) {
      $("#lotto-input-error").innerHTML = error.message;
    }
  }

  validateInput(categories, input) {
    startValidation(categories, input);

    if (Array.isArray(input)) {
      startValidation(commonInputValidation.categories, input);
      input.forEach((number) => {
        startValidation(winningLottoValidation.commonCategories, number);
      });
      return;
    }
    startValidation(commonInputValidation.categories, [input.bonusNumber]);
    startValidation(winningLottoValidation.commonCategories, input.bonusNumber);
  }

  openModal() {
    $("#modal").style.display = "flex";
  }

  closeModal() {
    $("#modal").style.display = "none";
  }

  closeModalOutside(event) {
    if (event.target.id === "modal") {
      this.closeModal();
    }
  }

  calculateWebLottoResult(webWinningCombination) {
    const webLottoResult = lottoResultMaker.calculateLottoResult(
      this.#webIssuedLottoArray,
      webWinningCombination
    );
    this.calculateWebRankResult(webLottoResult);
  }

  calculateWebRankResult(webLottoResult) {
    const webRankResult = lottoRankMaker.calculateLottoRank(webLottoResult);
    this.printWebRankResult(webRankResult);
    this.calculateWebProfit(webRankResult);
  }

  printWebRankResult(webRankResult) {
    Object.keys(webRankResult).forEach((rank) => {
      $(`#lotto-rank-${rank}`).innerHTML = webRankResult[rank];
    });
  }

  calculateWebProfit(webRankResult) {
    const webProfit = profitCalculator.calculateProfit(
      webRankResult,
      this.#webBudget
    );
    $("#profit-msg-num").innerHTML = webProfit.toFixed(0);
  }

  reloadTag() {
    this.removeWebIssuedLottoArray();
    this.removeWebWinningCombinationInput();
    $("#budget").value = "";
    $("#after-budget").id = "after-budget-invisible";
    const form = document.querySelector("#content-box-input-budget");
    const formInputs = form.querySelectorAll("#budget, .lotto-caption");

    formInputs.forEach((input) => {
      input.disabled = false;
    });

    this.closeModal();
  }
}

export default LottoWebController;
