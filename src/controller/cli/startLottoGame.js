import DomSelector from "../../utils/domSelector";
import handlePurchase from "../web/handlePurchase";
import handleRestart from "../web/handleRestart";
import handleWinningCheck from "../web/handleWinningCheck";

const startLottoGame = async () => {
  const purchase_button = DomSelector.purchaseButton;
  const purchase_amount = DomSelector.purchaseAmount;
  const reuslt_button = DomSelector.reusltButton;
  const lotto_result_modal = DomSelector.lottoResultModal;
  const restart_button = DomSelector.restartButton;

  purchase_button.addEventListener("click", () => {
    const { purchaseAmount, lottoPack } = handlePurchase();
    reuslt_button.addEventListener("click", () => handleWinningCheck(purchaseAmount, lottoPack));
  });

  purchase_amount.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      purchase_button.click();
    }
  });

  lotto_result_modal.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) lotto_result_modal.close();
  });

  restart_button.addEventListener("click", () => handleRestart());
};

export default startLottoGame;
