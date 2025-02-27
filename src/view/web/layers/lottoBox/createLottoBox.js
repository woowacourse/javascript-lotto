import createLottoList from "./createLottoList.js";
import createPurchaseMessage from "./createPurchaseMessage.js";
import "./lottoBox.css";

const createLottoBox = (lottoNumbers) => {
  const purchaseMessage = createPurchaseMessage(lottoNumbers);
  const lottoList = createLottoList(lottoNumbers);

  document.querySelector(".purchase-message").textContent = purchaseMessage;
  document
    .querySelector(".lotto-list")
    .insertAdjacentHTML("beforeend", lottoList);
};

export default createLottoBox;
