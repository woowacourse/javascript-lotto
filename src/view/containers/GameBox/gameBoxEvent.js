/* eslint-disable no-undef */
import { generateLottos } from "../../../domain/generateLottos";
import LottoValidator from "../../../domain/LottoValidator";
import Render from "../../../utils/Render";
import PurchaseResults from "../PurchaseResults";

const gameBoxEvent = () => {
  const input = document.getElementById("money-input");
  const btn = document.getElementById("purchase-button");

  btn.onclick = function () {
    try {
      LottoValidator.checkMoney(input.value);
      store['lottos'] = generateLottos((input.value));
      input.value = '';
      Render.initContainer("purchase-result", () => PurchaseResults(), () => { });
    } catch (error) {
      alert(error.message);
    }
  };
};

export default gameBoxEvent;
