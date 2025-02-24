import { generateLottoNumberSets } from "../../../lotto/index.js";
import { validateLottoPrice } from "../../../validation/index.js";
import createLottoNumbersBox from "../layers/createLottoNumbersBox.js";

const readLottoPriceInput = () => {
  const purchaseForm = document.getElementById("gameBox-purchaseInput-form");

  purchaseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const lottoNumbersBox = document.getElementsByClassName(
      "lotto-numbers-container",
    )[0];

    if (lottoNumbersBox) {
      lottoNumbersBox.remove();
    }

    const priceInput = document.getElementById("gameBox-price").value;
    const validPrice = checkPrice(priceInput);
    const lottoNumbers = generateLottoNumberSets(validPrice);

    createLottoNumbersBox(lottoNumbers);
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
