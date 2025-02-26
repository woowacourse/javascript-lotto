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

function displayLottos(lottos) {
  lottoListContainer.innerHTML = "";
  lottos.forEach((lotto) => {
    const lottoArray = lotto.getLottoNumber();
    console.log(lottoArray);
    // 로또 요소 만들고
    const lottoElement = document.createElement("div");
    lottoElement.className = "random__lotto";

    // 아이콘 넣고
    const iconElement = document.createElement("div");
    iconElement.className = "lotto__icon";
    iconElement.textContent = "🎟️";

    const numbersElement = document.createElement("div");
    numbersElement.className = "lotto__numbers";
    numbersElement.textContent = lottoArray.join(", ");

    lottoElement.appendChild(iconElement);
    lottoElement.appendChild(numbersElement);
    lottoListContainer.appendChild(lottoElement);
  });
}

function handlePurchase() {
  try {
    const rawPriceString = inputMoney.value;
    Validator.isPrice(rawPriceString);

    const lottoNum = Number(rawPriceString) / Constants.LOTTO.UNIT;
    lottoGame = new LottoGame(lottoNum);

    purchaseMessage.style.display = "block";
    purchaseMessage.textContent = `총 ${lottoNum}개를 구매하였습니다.`;

    displayLottos(lottoGame.lottos);
  } catch (error) {
    alert(error.message);
  }
}

function initApp() {
  purchaseMessage.style.display = "none";

  setupPurchaseEvent();
}

initApp();
