/* eslint-disable no-undef */
import { calculateBenefit } from "../../../domain/calculateBenefit";
import { judgeResult } from "../../../domain/judgeResult";
import LottoValidator from "../../../domain/LottoValidator";
import Container from "../../../utils/Container";
import GameModal from "../GameModal";
import modalEvent from "../GameModal/modalEvent";

const inputWinningNumberEvent = (store) => {

  const form = document.getElementById("winning-number-submit");

  form.onsubmit = function (event) {
    event.preventDefault();
    try {
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
      const result = judgeResult(store.lottos, store.winningNumber);
      const benefit = calculateBenefit(store.lottos.length * 1000, result);
      console.log(result, benefit);
      store['result'] = result;
      store['benefit'] = benefit;
      Container.render(
        "game-result",
        () => GameModal(store),
        () => modalEvent()
      );
      const modal = document.getElementById("game-modal");
      console.log(modal);
      modal.style.display = "block";
    } catch (error) {
      alert(error.message);
    }
  };
};

export default inputWinningNumberEvent;
