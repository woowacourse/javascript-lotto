import { generateRandomNumbers } from "../generateRandomNumbers.js";
import WebLottoManager from "../WebLottoManager.js";
import { formatLottoNumbers } from "../utils/formatter.js";
import {
  renderPurchaseLottos,
  renderResultModal,
  renderErrorMessage,
  removeErrorMessage,
  resetDOM,
  modalHiddenByBtn,
} from "../view/ui/render.js";
import { dom } from "../view/ui/dom.js";
import { parseStringToNumber } from "../utils/parser.js";

class WebLottoController {
  #webLottoManager = new WebLottoManager(generateRandomNumbers);

  purchase() {
    try {
      const amount = parseStringToNumber(dom.purchaseInput.value);
      const { count, lottos } = this.#webLottoManager.purchase(amount);
      const formattedLottos = lottos.map((lotto) => formatLottoNumbers(lotto));
      renderPurchaseLottos(count, formattedLottos);
      removeErrorMessage(dom.purchaseError);
    } catch (error) {
      renderErrorMessage(dom.purchaseError, error.message);
    }
  }

  getResult() {
    try {
      const winningNumbers = [...dom.winningNumberInputs].map((input) =>
        parseStringToNumber(input.value)
      );
      const bonusNumber = parseStringToNumber(dom.bonusNumberInput.value);
      const { prizeList, roi } = this.#webLottoManager.getResult(
        winningNumbers,
        bonusNumber
      );
      renderResultModal(prizeList, roi);
      removeErrorMessage(dom.winningError);
    } catch (error) {
      renderErrorMessage(dom.winningError, error.message);
    }
  }

  restart() {
    this.#webLottoManager.reset();
    resetDOM();
  }

  closeModal() {
    modalHiddenByBtn();
  }
}

export default WebLottoController;
