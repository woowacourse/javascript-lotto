import { parseStringToNumber } from "./utils/parser.js";
import { generateRandomNumbers } from "./generateRandomNumbers.js";
import WebLottoManager from "./WebLottoManager.js";
import { dom } from "./view/ui/dom.js";
import {
  removeErrorMessage,
  renderErrorMessage,
  renderPurchaseLottos,
  renderResultModal,
  resetDOM,
} from "./view/ui/render.js";

/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

const webLottoManager = new WebLottoManager(generateRandomNumbers);

dom.purchaseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  try {
    const amount = parseStringToNumber(dom.purchaseInput.value);
    const { count, lottos } = webLottoManager.purchase(amount);
    renderPurchaseLottos(count, lottos);
    removeErrorMessage(dom.purchaseError);
  } catch (error) {
    renderErrorMessage(dom.purchaseError, error.message);
  }
});

dom.resultBtn.addEventListener("click", () => {
  const winningNumbers = [...dom.winningNumberInputs].map((input) =>
    parseStringToNumber(input.value)
  );
  const bonusNumber = parseStringToNumber(dom.bonusNumberInput.value);
  try {
    const { prizeList, roi } = webLottoManager.getResult(
      winningNumbers,
      bonusNumber
    );
    renderResultModal(prizeList, roi);
    removeErrorMessage(dom.winningError);
  } catch (error) {
    renderErrorMessage(dom.winningError, error.message);
  }
});

dom.restartBtn.addEventListener("click", () => {
  webLottoManager.reset();
  resetDOM();
});
