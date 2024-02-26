import "../../index.css";
import Lotto from "../domain/Lotto";
import randomLottoArray from "../domain/randomLottoMaker";
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
      // 유효성 검사 해줘
      startValidation(budgetValidation.categories, webBudget);

      // 로또 발행 장 수 계산해줘
      const webIssuedLottoCount = this.calculateWebIssuedLottoCount(webBudget);

      // 발행된 로또 번호 가져와서 보여줘
      const webIssuedLottoArray = randomLottoArray(webIssuedLottoCount);
      webIssuedLottoArray.forEach((array) => {
        const issuedLottoDiv = document.createElement("div");
        const curr = $("#content-box-lottos");
        issuedLottoDiv.innerHTML = array;
        curr.append(issuedLottoDiv);
      });

      return true;
    } catch (error) {
      alert(error.message); // TODO : alert 말고 다른 종류로 바꾸기
    }
  },

  calculateWebIssuedLottoCount(webBudget) {
    const webLotto = new Lotto(webBudget);
    const webIssuedLottoCount = webLotto.calculateIssuedLottoCount();
    $("#issued-lotto-count").innerHTML = webIssuedLottoCount;
    return webIssuedLottoCount;
  },
};

export default lottoWebController;
