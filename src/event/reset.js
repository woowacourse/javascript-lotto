import lottoStore from "../store/lottoStore.js";
import priceStore from "../store/priceStore.js";

const reset = () => {
  priceStore.setPrice(0);
  lottoStore.setLottos([]);

  const dialog = document.querySelector("dialog");
  dialog.close();
  const whenBuyed = document.querySelector(".whenBuyed");
  const buyedLottos = document.querySelector(".buyedLottos");
  const winningNumberInputs = document.querySelectorAll(".winningNumberInput");
  const bonusNumberInput = document.querySelector(".bonusNumberInput");
  winningNumberInputs.forEach((input) => {
    input.value = "";
  });
  bonusNumberInput.value = "";
  buyedLottos.textContent = "";
  whenBuyed.style = "display: none";
};

export default reset;
