import createHeader from "./src/view/web/layers/header/header.js";
import createGameBox from "./src/view/web/layers/gameBox/createGameBox.js";
import createWinningLottoBox from "./src/view/web/layers/winningLottoBox/createWinningLottoBox.js";
import createFooter from "./src/view/web/layers/footer/footer.js";

import readLottoPriceInput from "./src/view/web/modules/readLottoPriceInput.js";
import readWinningNumbers from "./src/view/web/modules/readWinningNumbers.js";

import validateLottoPrice from "./src/validation/validateLottoPrice.js";
import generateLottoNumberSets from "./src/lotto/generateLottoNumberSets.js";
import createLottoBox from "./src/view/web/layers/lottoBox/createLottoBox.js";

import validateWinningNumbers from "./src/validation/validateWinningNumbers.js";
import validateBonusNumber from "./src/validation/validateBonusNumber.js";
import calculatePrizeResult from "./src/lotto/calculatePrizeResult.js";
import getTotalPrizeMoney from "./src/lotto/getTotalPrizeMoney.js";
import { getRevenueRate } from "./src/utils/math.js";

import createPrizeResultModal from "./src/view/web/layers/modal/createPrizeResultModal.js";
import showResultModal from "./src/view/web/modules/showResultModal.js";
import closeResultModal from "./src/view/web/modules/closeResultModalEvent.js";

const startGame = () => {
  initLayer();
  handleUserInput();
  handleResultModal();
};

const initLayer = () => {
  createHeader();
  createFooter();
  createGameBox();
  createWinningLottoBox();
};

const handleUserInput = () => {
  readLottoPriceInput(checkPrice, rendererUsingPrice);
  readWinningNumbers(checkWinningLotto, rendererUsingWinningLotto);
};

const checkPrice = (price) => {
  try {
    validateLottoPrice(price);
  } catch (error) {
    alert(error.message);
  }
};

const rendererUsingPrice = (price) => {
  const lottoNumbers = generateLottoNumberSets(price);
  createLottoBox(lottoNumbers);
};

const checkWinningLotto = (winningNumbers, bonusNumber) => {
  try {
    validateWinningNumbers(winningNumbers);
    validateBonusNumber(bonusNumber, winningNumbers);
  } catch (error) {
    alert(error.message);
  }
};

const rendererUsingWinningLotto = (winningNumbers, bonusNumber) => {
  const lottoNumbers = Array.from(
    document.querySelectorAll(".lotto-numbers"),
  ).map((li) => li.textContent.split(",").map(Number));

  const result = calculatePrizeResult(
    lottoNumbers,
    winningNumbers,
    bonusNumber,
  );

  const price = Number(document.querySelector("#price").value);
  const totalPrizeMoney = getTotalPrizeMoney(result);
  const revenueRate = getRevenueRate(totalPrizeMoney, price);
  createPrizeResultModal(result, revenueRate);
};

const handleResultModal = () => {
  showResultModal();
  closeResultModal();
};

export default startGame;
