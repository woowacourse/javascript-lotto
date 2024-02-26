import "../../index.css";
import Lotto from "../domain/Lotto";
import { $ } from "../utils/querySelector";
import budgetValidation from "../validation/budgetValidation";
import startValidation from "../validation/startValidation";

const lottoWebController = {
  async start() {
    // 입력받은 budget 처리 (submit) 후
    // budget 유효성 검사 통과하면 로또 발행
    $("#content-box-input-budget").addEventListener(
      "submit",
      this.handleWebBudget.bind(this)
    );
  },

  /**
   * 예산 입력 관리 및 유효성 검사
   * @param {event} e
   */
  handleWebBudget(e) {
    e.preventDefault();
    const webBudgetInput = $("#budget").value;
    const webBudget = Number(webBudgetInput);
    try {
      startValidation(budgetValidation.categories, webBudget);
      const webLotto = new Lotto(webBudget);
      const webIssuedLottoCount = webLotto.calculateIssuedLottoCount();
      $("#issued-lotto-count").innerHTML = webIssuedLottoCount;
      return true;
    } catch (error) {
      alert(error.message); // TODO : alert 말고 다른 종류로 바꾸기
    }
  },
};

export default lottoWebController;
