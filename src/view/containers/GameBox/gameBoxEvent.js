// import LottoController from "../../../domain/LottoController";

import { generateLottos } from "../../../domain/generateLottos";

/* eslint-disable no-undef */
const gameBoxEvent = () => {
  const input = document.getElementById("money-input");
  const btn = document.getElementById("purchase-button");

  btn.onclick = function () {
    console.log(input.value);
    console.log(generateLottos((input.value)));
    input.value = '';
  };
};

export default gameBoxEvent;
