import DomUpdator from "../../utils/DomUpdator";
import DomSelector from "../../utils/domSelector";
import handlePurchase from "./handlePurchase";
import handleRestart from "./handleRestart";
import handleWinningCheck from "./handleWinningCheck";

const startLottoGame = async () => {
  const purchase_button = DomSelector.purchaseButton;
  const purchase_amount = DomSelector.purchaseAmount;
  const reuslt_button = DomSelector.reusltButton;
  const lotto_result_modal = DomSelector.lottoResultModal;
  const restart_button = DomSelector.restartButton;
  const error_modal = DomSelector.errorModal;

  purchase_amount.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      purchase_button.click();
    }
  });

  purchase_button.addEventListener("click", () => {
    const { purchaseAmount, lottoPack } = handlePurchase();
    reuslt_button.addEventListener("click", () => handleWinningCheck(purchaseAmount, lottoPack));
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
