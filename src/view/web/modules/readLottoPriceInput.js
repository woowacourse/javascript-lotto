import { generateLottoNumberSets } from "../../../lotto/index.js";
import { validateLottoPrice } from "../../../validation/index.js";
import createLottoBox from "../layers/lottoBox/createLottoBox.js";
import createWinningLottoBox from "../layers/winningLottoBox/createWinningLottoBox.js";
import createNumbersInput from "../layers/winningLottoBox/createNumbersInput.js";
import createResultButton from "../layers/resultButton/createResultButton.js";
import showResultModal from "./showResultModalEvent.js";
import readWinningNumbers from "./readWinningNumbers.js";
import closeResultModal from "./closeResultModalEvent.js";

const readLottoPriceInput = () => {
  const purchaseForm = document.getElementById("game-purchaseInput-form");

  purchaseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const targets = document.querySelectorAll(".purchased-rendered");
    targets.forEach((target) => target.remove());

    const priceInput = document.getElementById("game-price").value;
    const validPrice = checkPrice(priceInput);
    const lottoNumbers = generateLottoNumberSets(validPrice);

    createLottoBox(lottoNumbers);
    createWinningLottoBox();
    createNumbersInput();
    createResultButton();
    readWinningNumbers(lottoNumbers, validPrice);

    showResultModal();
    closeResultModal();
  });
};

const checkPrice = (priceInput) => {
  try {
    const price = Number(priceInput);
    validateLottoPrice(price);
    return price;
  } catch (error) {
    alert(error.message);
  }
};

export default readLottoPriceInput;
