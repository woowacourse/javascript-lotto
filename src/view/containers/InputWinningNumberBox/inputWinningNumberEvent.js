/* eslint-disable no-undef */

import { judgeResult } from "../../../domain/judgeResult";
import LottoValidator from "../../../domain/LottoValidator";

const inputWinningNumberEvent = () => {

  const form = document.getElementById("winning-number-submit");

  form.onsubmit = function (event) {
    event.preventDefault();
    try {
      const modal = document.getElementById("game-modal");
      const formData = new FormData(event.target);
      const winningNumber = {
        main: [
          formData.get('main0'),
          formData.get('main1'),
          formData.get('main2'),
          formData.get('main3'),
          formData.get('main4'),
          formData.get('main5'),
        ],
        bonus: formData.get('bonus'),
      };
      LottoValidator.checkWinningNumber(winningNumber.main.join(','));
      LottoValidator.checkBonusNumber(winningNumber.bonus);
      LottoValidator.checkLottoDuplicate(winningNumber);
      store['winningNumber'] = winningNumber;
      modal.style.display = "block";
      console.log(judgeResult(store.lottos, store.winningNumber));

    } catch (error) {
      alert(error.message);
    }
  };
};

export default inputWinningNumberEvent;
