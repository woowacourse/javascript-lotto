import { generateLottoNumberSets } from "../../../lotto/index.js";
import { validateLottoPrice } from "../../../validation/index.js";
import createLottoBox from "../layers/lottoBox/createLottoBox.js";
import createWinningLottoBox from "../layers/winningLottoBox/createWinningLottoBox.js";

const readLottoPriceInput = () => {
  const purchaseForm = document.getElementById("gameBox-purchaseInput-form");

  purchaseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const targets = document.querySelectorAll(".purchase-rendered");
    targets.forEach((target) => target.remove());

    const priceInput = document.getElementById("gameBox-price").value;
    const validPrice = checkPrice(priceInput);
    const lottoNumbers = generateLottoNumberSets(validPrice);

    createLottoBox(lottoNumbers);
    createWinningLottoBox();
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
