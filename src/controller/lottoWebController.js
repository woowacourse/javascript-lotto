import "../../index.css";
import Lotto from "../domain/Lotto.js";
import lottoResultMaker from "../domain/lottoResultMaker.js";
import randomLottoArray from "../domain/randomLottoMaker.js";
import { $, $$ } from "../utils/querySelector.js";
import budgetValidation from "../validation/budgetValidation.js";
import startValidation from "../validation/startValidation.js";
import winningLottoBonusValidation from "../validation/winningLottoBonusValidation.js";
import winningLottoNumbersValidation from "../validation/winningLottoNumbersValidation.js";
import winningLottoValidation from "../validation/winningLottoValidation.js";

class LottoWebController {
  #webIssuedLottoArray;
  async start() {
    // 입력받은 budget 처리 (submit) 후
    // budget 유효성 검사 통과하면 로또 발행
    $("#content-box-input-budget").addEventListener(
      "submit",
      this.handleWebBudget.bind(this)
    );
    $("#result-btn").addEventListener(
      "click",
      this.handleWebWinningCombinationInput.bind(this)
    );
    $("#modal-close-btn").addEventListener("click", this.closeModal.bind(this));
  }

  getWebBudget() {
    const webBudgetInput = $("#budget").value;
    const webBudget = Number(webBudgetInput);
    return webBudget;
  }

  /**
   * 예산 입력 관리 및 유효성 검사
   * @param {event} e
   */
  handleWebBudget(event) {
    event.preventDefault();
    const webBudget = this.getWebBudget();
    try {
      // 유효성 검사 해줘
      startValidation(budgetValidation.categories, webBudget);

      // 로또 발행 장 수 계산해줘
      const webIssuedLottoCount = this.calculateWebIssuedLottoCount(webBudget);

      // 발행된 로또 번호 가져와서 보여줘
      $("#after-budget").style.display = "block";
      this.handleWebIssuedLottoArray(webIssuedLottoCount);
    } catch (error) {
      return alert(error.message); // TODO : alert 말고 다른 종류로 바꾸기
    }
  }

  calculateWebIssuedLottoCount(webBudget) {
    const webLotto = new Lotto(webBudget);
    const webIssuedLottoCount = webLotto.calculateIssuedLottoCount();
    $("#issued-lotto-count").innerHTML = webIssuedLottoCount;
    return webIssuedLottoCount;
  }

  handleWebIssuedLottoArray(webIssuedLottoCount) {
    this.#webIssuedLottoArray = randomLottoArray(webIssuedLottoCount);
    this.printWebIssuedLottoArray();
  }

  // TODO : 구입 누를 때마다 div 추가되는 것 수정하기
  printWebIssuedLottoArray() {
    this.#webIssuedLottoArray.forEach((array) => {
      const issuedLottoDiv = document.createElement("div");
      const curr = $("#content-box-lottos");
      issuedLottoDiv.innerHTML = array;
      curr.append(issuedLottoDiv);
    });
  }

  /**
   * 당첨 번호 및 보너스 번호 입력값 관리
   */
  handleWebWinningCombinationInput() {
    const webWinningNumbersInput = Array.from({ length: 6 }, (_, index) => {
      return Number($$("#lotto-numbers-input")[index].value);
    });

    const webWinningBonusInput = Number($("#lotto-bonus-input").value);
    const webWinningCombination = {
      normalNumbers: webWinningNumbersInput,
      bonusNumber: webWinningBonusInput,
    };

    try {
      startValidation(
        winningLottoNumbersValidation.winningNumbers,
        webWinningNumbersInput
      );
      startValidation(
        winningLottoValidation.commonCategories,
        webWinningBonusInput
      );
      startValidation(
        winningLottoBonusValidation.winningBonus,
        webWinningCombination
      );
      console.log("validation success");
      this.calculateWebLottoResult(webWinningCombination);
      this.openModal();
    } catch (error) {
      alert(error.message); // TODO : alert 말고 다른 종류로 바꾸기
    }
  }

  openModal() {
    console.log("openModal");
    $("#modal").style.display = "flex";
  }

  closeModal() {
    console.log("closeModal");
    $("#modal").style.display = "none";
  }

  calculateWebLottoResult(webWinningCombination) {
    console.log("calculateWebLottoResult");
    console.log(this.#webIssuedLottoArray);
    // const webLottoResult = lottoResultMaker.calculateLottoResult(
    //   this.#webIssuedLottoArray,
    //   webWinningCombination
    // );
    // console.log(webLottoResult);
  }
}

export default LottoWebController;
