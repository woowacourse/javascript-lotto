import createLottoNumbersList from "./createLottoNumbersList.js";
import createPurchaseMessage from "./createPurchaseMessage.js";
import "./lottoBox.css";

const createLottoBox = (lottoNumbers) => {
  const lottoBox = document.createElement("div");
  lottoBox.id = "lotto-container";

  document.getElementById("gameBox-container").appendChild(lottoBox);

  createPurchaseMessage(lottoNumbers);
  createLottoNumbersList(lottoNumbers);
};

export default createLottoBox;
