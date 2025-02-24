import createLottoList from "./createLottoList.js";
import createPurchaseMessage from "./createPurchaseMessage.js";
import "./lottoBox.css";

const createLottoBox = (lottoNumbers) => {
  const lottoBox = document.createElement("div");
  lottoBox.id = "lotto-container";
  lottoBox.className = "purchased-rendered";

  document.getElementById("game-container").appendChild(lottoBox);

  createPurchaseMessage(lottoNumbers);
  createLottoList(lottoNumbers);
};

export default createLottoBox;
