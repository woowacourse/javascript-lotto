import startValidation from "../../validation/startValidation.js";
import budgetValidation from "../../validation/budgetValidation.js";
import { setBtnDisabled } from "../utility/setBtnDisabled.js";
import { calculator } from "../../domain/calculator.js";
import { LOTTO_SETTING } from "../../constants/lottoConstants.js";
import { OUTPUT_MESSAGE } from "../constants/viewMessage.js";

class BudgetController {
  #budget = 0;

  constructor(playLottoGameCallback) {
    this.#setClickPurchaseBtnHandler(playLottoGameCallback);
  }

  #setClickPurchaseBtnHandler(playLottoGameCallback) {
    const purchaseBtn = document.querySelector("#purchase-btn");
    purchaseBtn.addEventListener("click", () =>
      this.#handleBudgetBtnClick(playLottoGameCallback)
    );
  }

  #handleBudgetBtnClick(playLottoGameCallback) {
    const purchaseBtn = document.querySelector("#purchase-btn");
    const budgetInput = document.querySelector("#budget-input").value;

    try {
      startValidation(budgetValidation.categories, Number(budgetInput));

      setBtnDisabled(purchaseBtn);

      this.#budget = Number(budgetInput);
      this.#printLottoCount();
      playLottoGameCallback();
    } catch (error) {
      alert(error.message);
    }
  }

  #printLottoCount() {
    const afterBuySec = document.querySelector("#after-buy-section");

    const lottoCountP = document.createElement("p");
    lottoCountP.classList.add("lotto-game-p");
    lottoCountP.textContent = OUTPUT_MESSAGE.formatLottoCount(
      calculator.getQuotient(this.#budget, LOTTO_SETTING.PRICE)
    );

    afterBuySec.appendChild(lottoCountP);
  }

  getLottoCount() {
    return calculator.getQuotient(this.#budget, LOTTO_SETTING.PRICE);
  }
}

export default BudgetController;
