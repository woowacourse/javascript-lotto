import "../styles/index.css";
import Lotto from "../domain/Lotto.js";
import lottoRankMaker from "../domain/lottoRankMaker.js";
import lottoResultMaker from "../domain/lottoResultMaker.js";
import profitCalculator from "../domain/profitCalculator.js";
import { $, $$ } from "../utils/querySelector.js";
import budgetValidation from "../validation/budgetValidation.js";
import commonInputValidation from "../validation/commonInputValidation.js";
import startValidation from "../validation/startValidation.js";
import winningLottoBonusValidation from "../validation/winningLottoBonusValidation.js";
import winningLottoNumbersValidation from "../validation/winningLottoNumbersValidation.js";
import winningLottoValidation from "../validation/winningLottoValidation.js";
import WebView from "../view/WebView.js";

class LottoWebController {
  #webIssuedLottoArray;
  #webBudget;

  async start() {
    $("#content-box-input-budget").addEventListener("submit", this.handleWebBudget.bind(this));
    $("#modal-close-btn").addEventListener("click", WebView.closeModal.bind());
    $("#modal-retry-btn").addEventListener("click", WebView.reloadTag.bind(WebView));
    $("#modal").addEventListener("click", WebView.closeModalOutside.bind(WebView));

    $("#content-box-input-combination").addEventListener("submit", this.handleWebWinningCombinationInput.bind(this));
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

      const webLotto = new Lotto(this.#webBudget);
      const webIssuedLottoCount = webLotto.calculateIssuedLottoCount();
      this.#webIssuedLottoArray = webLotto.IssuedLotto(webIssuedLottoCount);

      WebView.handleAfterBudget();
      WebView.printWebIssuedLottoArray(this.#webIssuedLottoArray);
      WebView.printWebIssuedLottoCount(webIssuedLottoCount);
    } catch (error) {
      return alert(error.message);
    }
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
      this.validateWebWinningCombinationInput(webWinningNumbersInput, webWinningCombination);
    } catch (error) {
      WebView.printWebWinningCombinationMessage(error.message);
    }
  }

  validateWebWinningCombinationInput(webWinningNumbersInput, webWinningCombination) {
    this.startWebValidate(winningLottoNumbersValidation.winningNumbers, webWinningNumbersInput);
    this.startWebValidate(winningLottoBonusValidation.winningBonus, webWinningCombination);

    this.calculateWebLottoResult(webWinningCombination);
    WebView.openModal();
  }

  startWebValidate(categories, input) {
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

  calculateWebLottoResult(webWinningCombination) {
    const webLottoResult = lottoResultMaker.calculateLottoResult(this.#webIssuedLottoArray, webWinningCombination);
    this.calculateWebRankResult(webLottoResult);
  }

  calculateWebRankResult(webLottoResult) {
    const webRankResult = lottoRankMaker.calculateLottoRank(webLottoResult);
    WebView.printWebRankResult(webRankResult);
    this.calculateWebProfit(webRankResult);
  }

  calculateWebProfit(webRankResult) {
    const webProfit = profitCalculator.calculateProfit(webRankResult, this.#webBudget);
    WebView.printWebProfit(webProfit);
  }
}

export default LottoWebController;
