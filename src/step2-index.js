import LottoGame from "./domain/LottoGame.js";
import Validator from "./domain/Validator.js";
import Constants from "./constant/Constants.js";
import LottoInput from "./view/web/components/LottoInput.js";
import LottoList from "./view/web/components/LottoList.js";
import WinningNumbers from "./view/web/components/WinningNumber.js";

let lottoGame = null;
let lottoInput = null;
let lottoList = null;
let winningNumbers = null;

const resultModal = document.querySelector("#resultModal");
const match3Element = document.querySelector("#match-3");
const match4Element = document.querySelector("#match-4");
const match5Element = document.querySelector("#match-5");
const match5BonusElement = document.querySelector("#match-5-bonus");
const match6Element = document.querySelector("#match-6");
const totalReturnRateElement = document.querySelector("#total-return-rate");
const restartButton = document.querySelector("#restart-button");

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

function handlePurchaseCallback(lottoNum) {
  lottoGame = new LottoGame(lottoNum);
  lottoList.displayLottos(lottoGame.lottos);
  winningNumbers.show();
}

function handleResultCallback(winningNumbers, bonusNumber) {
  lottoGame.calculate(winningNumbers, bonusNumber);
  displayResult();
}

function setupRestartButton() {
  restartButton.addEventListener("click", () => {
    resultModal.style.display = "none";
    lottoGame = null;
    lottoInput.reset();
    lottoList.clear();
    winningNumbers.reset();
  });
}

function initApp() {
  setupRestartButton();
}

lottoInput = new LottoInput(handlePurchaseCallback);
lottoList = new LottoList();
winningNumbers = new WinningNumbers(handleResultCallback);

initApp();
