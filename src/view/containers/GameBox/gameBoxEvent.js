/* eslint-disable no-undef */
import { generateLottos } from "../../../domain/generateLottos";
import LottoValidator from "../../../domain/LottoValidator";
import Render from "../../../utils/Render";
import InputWinningNumberBox from "../InputWinningNumberBox";
import inputWinningNumberEvent from "../InputWinningNumberBox/inputWinningNumberEvent";
import PurchaseResults from "../PurchaseResults";
import GameModal from "../GameModal";
import modalEvent from "../GameModal/modalEvent";

const gameBoxEvent = () => {
  const form = document.getElementById("money-submit");

  form.onsubmit = function (event) {
    event.preventDefault();
    const money = event.target.money.value;
    try {
      LottoValidator.checkMoney(money);
      store['lottos'] = generateLottos((money));
      event.target.money.value = '';
      Render.container("purchase-result", () => PurchaseResults(), () => { });
      Render.container("input-winning-number", () => InputWinningNumberBox(), () => { inputWinningNumberEvent(); });
      Render.container("game-result", () => GameModal(), () => modalEvent());
    } catch (error) {
      alert(error.message);
    }
  };
};

export default gameBoxEvent;
