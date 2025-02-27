import LottoGame from "./domain/LottoGame.js";
import Validator from "./domain/Validator.js";
import Constants from "./constant/Constants.js";

const middleSection = document.querySelector(".lotto__middle");

const purchaseButton = document.querySelector(".lotto__input__btn");
const inputMoney = document.querySelector(".input__money");
const purchaseMessage = document.querySelector(".lotto__box p:nth-of-type(2)");
const lottoListContainer = document.querySelector(".lotto__list");
const winningNumberInputs = document.querySelectorAll(
  ".target__lottos .one__numbers__input",
);
const bonusNumberInput = document.querySelector(
  ".bonus__number .one__numbers__input",
);
const resultButton = document.querySelector(".result__btn");

const resultModal = document.querySelector("#resultModal");
const match3Element = document.querySelector("#match-3");
const match4Element = document.querySelector("#match-4");
const match5Element = document.querySelector("#match-5");
const match5BonusElement = document.querySelector("#match-5-bonus");
const match6Element = document.querySelector("#match-6");
const totalReturnRateElement = document.querySelector("#total-return-rate");
const restartButton = document.querySelector("#restart-button");

let lottoGame = null;
function displayResult() {
  if (!lottoGame) {
    return;
  }

  const gameResult = lottoGame.getGameResult();
  const lottoNum = lottoGame.lottos.length;
  const earningRate = lottoGame.getEarningRate(lottoNum);
  console.log({ earningRate, lottoNum, gameResult });
  // 각 등수별 당첨 횟수 업데이트
  match3Element.textContent = `${gameResult["5"]}개`;
  match4Element.textContent = `${gameResult["4"]}개`;
  match5Element.textContent = `${gameResult["3"]}개`;
  match5BonusElement.textContent = `${gameResult["2"]}개`;
  match6Element.textContent = `${gameResult["1"]}개`;

  // 수익률 업데이트
  totalReturnRateElement.textContent = `당신의 총 수익률은 ${earningRate}%입니다.`;

  // 모달 표시
  resultModal.style.display = "flex";
}

function setupPurchaseEvent() {
  purchaseButton.addEventListener("click", handlePurchase);
}

function displayLottos(lottos) {
  lottoListContainer.innerHTML = "";
  lottos.forEach((lotto) => {
    const lottoArray = lotto.getLottoNumber();
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
    middleSection.style.display = "block";
    purchaseMessage.textContent = `총 ${lottoNum}개를 구매하였습니다.`;

    displayLottos(lottoGame.lottos);
  } catch (error) {
    alert(error.message);
  }
}

function setupResultButton() {
  resultButton.addEventListener("click", handleResult);
}

function handleResult() {
  try {
    if (!lottoGame) {
      throw new Error("로또를 먼저 구매해주세요.");
    }

    const winningNumbers = [];

    winningNumberInputs.forEach((input) => {
      if (!input.value) {
        throw new Error("당첨 번호를 모두 입력해주세요.");
      }
      winningNumbers.push(Number(input.value));
    });

    Validator.isTargetNumber(winningNumbers.join(", "));

    if (!bonusNumberInput.value) {
      throw new Error("보너스 번호를 입력해주세요.");
    }

    const bonusNumber = Number(bonusNumberInput.value);
    Validator.isBonusNumber(bonusNumber, winningNumbers);

    lottoGame.calculate(winningNumbers, bonusNumber);
    displayResult();
  } catch (error) {
    alert(error.message);
  }
}

function initApp() {
  purchaseMessage.style.display = "none";
  middleSection.style.display = "none";

  setupPurchaseEvent();
  setupResultButton();
}

initApp();
