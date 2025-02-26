import LottoGame from "./domain/LottoGame.js";
import Validator from "./domain/Validator.js";
import Constants from "./constant/Constants.js";

const purchaseButton = document.querySelector(".lotto__input__btn");
const inputMoney = document.querySelector(".input__money");
const purchaseMessage = document.querySelector(".lotto__box p:nth-of-type(2)");
const lottoListContainer = document.querySelector(".lotto__list");

let lottoGame = null;

function setupPurchaseEvent() {
  purchaseButton.addEventListener("click", handlePurchase);
}

function handlePurchase() {
  try {
    const rawPriceString = inputMoney.value;
    Validator.isPrice(rawPriceString);

    const lottoNum = Number(rawPriceString) / Constants.LOTTO.UNIT;
    lottoGame = new LottoGame(lottoNum);

    purchaseMessage.style.display = "block";
    purchaseMessage.textContent = `총 ${lottoNum}개를 구매하였습니다.`;

    // displayLottos(lottoGame.lottos);
  } catch (error) {
    alert(error.message);
  }
}

function initApp() {
  purchaseMessage.style.display = "none";
  lottoListContainer.innerHTML = "";
  setupPurchaseEvent();
}

initApp();
