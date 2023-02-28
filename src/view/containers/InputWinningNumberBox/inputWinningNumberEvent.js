/* eslint-disable no-undef */
import { calculateBenefit } from "../../../domain/calculateBenefit";
import { judgeResult } from "../../../domain/judgeResult";
import LottoValidator from "../../../domain/LottoValidator";
import Container from "../../../utils/Container";
import GameModal from "../GameModal";
import modalEvent from "../GameModal/modalEvent";

const winningNumberObject = (event) => {
  const formData = new FormData(event.target);
  return {
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
};

const winningNumberValidator = (winningNumber) => {
  LottoValidator.checkWinningNumber(winningNumber.main.join(','));
  LottoValidator.checkBonusNumber(winningNumber.bonus);
  LottoValidator.checkLottoDuplicate(winningNumber);
};

const calculateLottos = (global) => {
  const result = judgeResult(global.getStore('lottos'), global.getStore('winningNumber'));
  const benefit = calculateBenefit(global.getStore('lottos').length * 1000, result);
  global.setStore('result', result);
  global.setStore('benefit', benefit);
};

const renderGameResult = (global) => {
  Container.render(
    "game-result",
    () => GameModal(global),
    () => modalEvent()
  );
};

const openGameModal = () => {
  const modal = document.getElementById("game-modal");
  modal.style.display = "block";
};

const inputWinningNumberEvent = (global) => {

  const form = document.getElementById("winning-number-submit");

  form.onsubmit = function (event) {
    event.preventDefault();
    try {
      const winningNumber = winningNumberObject(event);
      winningNumberValidator(winningNumber);
      global.setStore('winningNumber', winningNumber);
      calculateLottos(global);
      renderGameResult(global);
      openGameModal();
    } catch (error) {
      alert(error.message);
    }
  };
};

export default inputWinningNumberEvent;
