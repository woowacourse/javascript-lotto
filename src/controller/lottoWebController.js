import "../../index.css";
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
    $("#result-btn").addEventListener(
      "click",
      this.handleWebWinningCombinationInput.bind(this)
    );
    $("#modal-close-btn").addEventListener("click", this.closeModal.bind(this));
    $("#modal-retry-btn").addEventListener("click", this.reloadPage.bind(this));

    $("#content-box-input-combination")
      .querySelectorAll("input")
      .forEach((query) =>
        query.addEventListener("keydown", this.enterToResultButton.bind(this))
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
      // 유효성 검사 해줘
      startValidation(budgetValidation.categories, this.#webBudget);

      // 로또 발행 장 수 계산해줘
      const webIssuedLottoCount = this.calculateWebIssuedLottoCount();

      // 발행된 로또 번호 가져와서 보여줘
      $("#after-budget").style.display = "flex";
      const budgetInputNodes = $("#content-box-input-budget");
      budgetInputNodes.querySelector("input").disabled = true;
      budgetInputNodes.querySelector("button").disabled = true;

      this.handleWebIssuedLottoArray(webIssuedLottoCount);
    } catch (error) {
      return alert(error.message); // TODO : alert 말고 다른 종류로 바꾸기
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

    const setCommonStyles = (element, styles) => {
      Object.assign(element.style, styles);
    };

    this.#webIssuedLottoArray.forEach((array) => {
      const lottoImoji = Object.assign(document.createElement("div"), {
        innerHTML: "🎟️",
      });

      setCommonStyles(lottoImoji, {
        display: "inline-block",
        width: "3.4rem",
        height: "3.6rem",
        lineHeight: "3.6rem",
        marginRight: "0.8rem",
        boxSizing: "border-box",
        fontSize: "3rem",
        verticalAlign: "middle",
      });

      const issuedLottoDiv = Object.assign(document.createElement("div"), {
        innerHTML: array.join(", "),
        className: "lotto-body",
      });

      setCommonStyles(issuedLottoDiv, {
        display: "inline-block",
        height: "3.6rem",
        lineHeight: "3.6rem",
        verticalAlign: "middle",
      });

      const issuedLotto = document.createElement("div");
      issuedLotto.style.marginTop = "0.4rem";
      issuedLotto.append(lottoImoji, issuedLottoDiv);

      curr.append(issuedLotto);
    });
  }

  /**
   * 당첨 번호 및 보너스 번호 입력값 관리
   */
  handleWebWinningCombinationInput() {
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
      console.log("array");
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
    console.log("openModal");
    $("#modal").style.display = "flex";
  }

  closeModal(event) {
    console.log("closeModal");
    event.preventDefault();
    $("#modal").style.display = "none";
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

  reloadPage(event) {
    event.preventDefault();
    document.location.reload();
  }

  enterToResultButton(event) {
    if (event.keyCode === 13) {
      return this.handleWebWinningCombinationInput(this);
    }
  }
}

export default LottoWebController;
