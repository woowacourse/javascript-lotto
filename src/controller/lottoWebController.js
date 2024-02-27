import "../../index.css";
import Lotto from "../domain/Lotto.js";
import randomLottoArray from "../domain/randomLottoMaker.js";
import { $, $$ } from "../utils/querySelector.js";
import budgetValidation from "../validation/budgetValidation.js";
import startValidation from "../validation/startValidation.js";
import winningLottoBonusValidation from "../validation/winningLottoBonusValidation.js";
import winningLottoNumbersValidation from "../validation/winningLottoNumbersValidation.js";
import winningLottoValidation from "../validation/winningLottoValidation.js";

const lottoWebController = {
  async start() {
    // 입력받은 budget 처리 (submit) 후
    // budget 유효성 검사 통과하면 로또 발행
    $("#content-box-input-budget").addEventListener(
      "submit",
      this.handleWebBudget.bind(this)
    );
    $("#result-btn").addEventListener(
      "click",
      this.handleWebLottoCombinationInput.bind(this)
    );
    $("#modal-close-btn").addEventListener("click", this.closeModal.bind(this));
  },

  getWebBudget() {
    const webBudgetInput = $("#budget").value;
    const webBudget = Number(webBudgetInput);
    return webBudget;
  },

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
      // TODO : 구입 누를 때마다 div 추가되는 것 수정하기
      this.printWebIssuedLottoCount(webIssuedLottoCount);

      // 입력한 당첨 번호 관리
      // this.handleWebLottoCombinationInput();
    } catch (error) {
      return alert(error.message); // TODO : alert 말고 다른 종류로 바꾸기
    }
  },

  calculateWebIssuedLottoCount(webBudget) {
    const webLotto = new Lotto(webBudget);
    const webIssuedLottoCount = webLotto.calculateIssuedLottoCount();
    $("#issued-lotto-count").innerHTML = webIssuedLottoCount;
    return webIssuedLottoCount;
  },

  printWebIssuedLottoCount(webIssuedLottoCount) {
    const webIssuedLottoArray = randomLottoArray(webIssuedLottoCount);
    webIssuedLottoArray.forEach((array) => {
      const issuedLottoDiv = document.createElement("div");
      const curr = $("#content-box-lottos");
      issuedLottoDiv.innerHTML = array;
      curr.append(issuedLottoDiv);
    });
  },

  /**
   * 당첨 번호 및 보너스 번호 입력값 관리
   */
  handleWebLottoCombinationInput() {
    const webLottoNumbersInput = Array.from({ length: 6 }, (_, index) => {
      return Number($$("#lotto-numbers-input")[index].value);
    });

    const webLottoBonusInput = Number($("#lotto-bonus-input").value);
    const webLottoCombination = {
      normalNumbers: webLottoNumbersInput,
      bonusNumber: webLottoBonusInput,
    };

    try {
      startValidation(
        winningLottoNumbersValidation.winningNumbers,
        webLottoNumbersInput
      );
      startValidation(
        winningLottoValidation.commonCategories,
        webLottoBonusInput
      );
      startValidation(
        winningLottoBonusValidation.winningBonus,
        webLottoCombination
      );
      console.log("validation success");

      this.openModal();
    } catch (error) {
      alert(error.message);
    }
  },

  openModal() {
    console.log("openModal");
    $("#modal").style.display = "flex";
  },

  closeModal() {
    console.log("closeModal");
    $("#modal").style.display = "none";
  },
};

export default lottoWebController;
