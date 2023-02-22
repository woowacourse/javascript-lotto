// import LottoController from "../../../domain/LottoController";

import { generateLottos } from "../../../domain/generateLottos";
import LottoValidator from "../../../domain/LottoValidator";

/* eslint-disable no-undef */
const gameBoxEvent = () => {
  const input = document.getElementById("money-input");
  const btn = document.getElementById("purchase-button");

  btn.onclick = function () {
    try {
      LottoValidator.checkMoney(input.value);
      console.log(generateLottos((input.value)));
      input.value = '';
    } catch (error) {
      alert(error.message);
    }
  };
};

export default gameBoxEvent;
