import DomSelector from "../../utils/DomSelectors.js";
import DomUpdator from "../../utils/DomUpdator.js";
import handlePurchase from "./handlePurchase.js";
import handleRestart from "./handleRestart.js";
import handleWinningCheck from "./handleWinningCheck.js";

const startLottoGame = () => {
  const purchase_amount = DomSelector.purchaseAmount;
  const answer_lotto = DomSelector.answerLotto;
  const lotto_result_modal = DomSelector.lottoResultModal;
  const restart_button = DomSelector.restartButton;
  const error_modal = DomSelector.errorModal;

  purchase_amount.addEventListener("submit", (e) => {
    e.preventDefault();
    const { purchaseAmount, lottoPack } = handlePurchase();

    answer_lotto.addEventListener("submit", (e) => {
      e.preventDefault();
      handleWinningCheck(purchaseAmount, lottoPack);
    });
  });

  lotto_result_modal.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) DomUpdator.showModal(lotto_result_modal, false);
  });
  error_modal.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) DomUpdator.showModal(error_modal, false);
  });

  restart_button.addEventListener("click", () => handleRestart());
};

export default startLottoGame;
