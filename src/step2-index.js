import LottoGame from "./domain/LottoGame.js";
import Validator from "./domain/Validator.js";
import Constants from "./constant/Constants.js";
import LottoInput from "./view/web/components/LottoInput.js";

const middleSection = document.querySelector(".lotto__middle");
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

  match3Element.textContent = `${gameResult["5"]}개`;
  match4Element.textContent = `${gameResult["4"]}개`;
  match5Element.textContent = `${gameResult["3"]}개`;
  match5BonusElement.textContent = `${gameResult["2"]}개`;
  match6Element.textContent = `${gameResult["1"]}개`;

  totalReturnRateElement.textContent = `당신의 총 수익률은 ${earningRate}%입니다.`;

  resultModal.style.display = "flex";
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

function handlePurchaseCallback(lottoNum) {
  lottoGame = new LottoGame(lottoNum);
  displayLottos(lottoGame.lottos);
  middleSection.style.display = "block";
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

function setupRestartButton() {
  restartButton.addEventListener("click", () => {
    resultModal.style.display = "none";

    bonusNumberInput.value = "";

    middleSection.style.display = "none";
    lottoListContainer.innerHTML = "";

    lottoGame = null;
    lottoInput.reset();
  });
}

function initApp() {
  purchaseMessage.style.display = "none";
  middleSection.style.display = "none";

  setupResultButton();
  setupRestartButton();
}

const lottoInput = new LottoInput(handlePurchaseCallback);
initApp();
