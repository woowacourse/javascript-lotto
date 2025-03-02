import createHeader from "./src/view/web/layers/header/header.js";
import createGameBox from "./src/view/web/layers/gameBox/createGameBox.js";
import createWinningLottoBox from "./src/view/web/layers/winningLottoBox/createWinningLottoBox.js";
import createFooter from "./src/view/web/layers/footer/footer.js";

import readLottoPrice from "./src/view/web/modules/readLottoPrice.js";
import readWinningNumbers from "./src/view/web/modules/readWinningNumbers.js";

import { validateInput } from "./src/view/web/utilsWeb/validation.js";
import validateLottoPrice from "./src/validation/validateLottoPrice.js";
import generateLottoNumberSets from "./src/lotto/generateLottoNumberSets.js";
import createLottoBox from "./src/view/web/layers/lottoBox/createLottoBox.js";

import validateWinningNumbers from "./src/validation/validateWinningNumbers.js";
import validateBonusNumber from "./src/validation/validateBonusNumber.js";
import calculatePrizeResult from "./src/lotto/calculatePrizeResult.js";
import getTotalPrizeMoney from "./src/lotto/getTotalPrizeMoney.js";
import { getRevenueRate } from "./src/utils/math.js";

import createPrizeResultModal from "./src/view/web/layers/modal/createPrizeResultModal.js";
import showResultModal from "./src/view/web/modules/showModal.js";
import closeResultModal from "./src/view/web/modules/closeModal.js";
import revealElement from "./src/view/web/modules/revealElement.js";
import restartGame from "./src/view/web/modules/restartGame.js";
import {
  getLottoNumbers,
  getPrice,
} from "./src/view/web/globalElements/getElements.js";
import createErrorAlertModal from "./src/view/web/layers/modal/errorAlert/createErrorAlertModal.js";

const startGame = () => {
  initLayer();
  handleUserInput();
};

const initLayer = () => {
  createHeader();
  createFooter();
  createGameBox();
  createWinningLottoBox();
};

const handleUserInput = () => {
  readLottoPrice(checkPrice, rendererUsingPrice);
  readWinningNumbers(checkWinningLotto, rendererUsingWinningLotto);
};

const checkPrice = (price) => {
  return validateInput({
    validatorList: [() => validateLottoPrice(price)],
    errorHandler: (error) => {
      createErrorAlertModal(error.message);
      handleResultModal(".error-alert-modal");
    },
  });
};

const rendererUsingPrice = (price) => {
  const lottoNumbers = generateLottoNumberSets(price);
  createLottoBox(lottoNumbers);
  revealElement(".winning-lotto-container");
};

const checkWinningLotto = (winningNumbers, bonusNumber) => {
  return validateInput({
    validatorList: [
      () => validateWinningNumbers(winningNumbers),
      () => validateBonusNumber(bonusNumber, winningNumbers),
    ],
    errorHandler: (error) => {
      createErrorAlertModal(error.message);
      handleResultModal(".error-alert-modal");
    },
  });
};

const rendererUsingWinningLotto = (winningNumbers, bonusNumber) => {
  const price = getPrice();
  const lottoNumbers = getLottoNumbers();

  const result = calculatePrizeResult(
    lottoNumbers,
    winningNumbers,
    bonusNumber,
  );

  const totalPrizeMoney = getTotalPrizeMoney(result);
  const revenueRate = getRevenueRate(totalPrizeMoney, price);

  createPrizeResultModal(result, revenueRate);
  handleResultModal(".prize-result-modal");
};

const handleResultModal = (targetSelector) => {
  showResultModal(targetSelector);
  closeResultModal(targetSelector);
  restartGame();
};

export default startGame;
