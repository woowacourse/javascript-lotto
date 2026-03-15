/**
 * step 2의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import Validator from "./Utils/Validator.js";
import LottoMachine from "./Domain/LottoMachine.js";
import OutputView from "./View/OutputView.js";
import LottoResultCalculator from "./Domain/LottoResultCalculator.js";

let lottos = [];
let purchasePrice = 0;

const inputPrice = document.querySelector("#inputPrice");
const purchaseButton = document.querySelector("#purchaseButton");
const winningLottoSection = document.querySelector(".winning-lotto");
const resultButton = document.querySelector("#result-button");
const modalOverLay = document.querySelector(".modal-overlay");
const restartButton = document.querySelector("#restart-button");

purchaseButton.addEventListener("click", () => {
  try {
    purchasePrice = Validator.validatePurchasePrice(inputPrice.value);

    const lottoMachine = new LottoMachine();
    lottos = lottoMachine.issueLottos(purchasePrice);

    OutputView.printLottoList(lottos);

    const winningText = document.getElementById("winning-numbers-text");
    const bonusText = document.getElementById("bonus-number-text");

    winningLottoSection.classList.add("show");

    winningText.textContent = "당첨 번호";
    bonusText.textContent = "보너스 번호";

    resultButton.style.display = "block";
  } catch (e) {
    window.alert(e.message);
  }
});

resultButton.addEventListener("click", () => {
  try {
    modalOverLay.classList.add("show");

    const number1 = document.getElementById("winning-number-input-1");
    const number2 = document.getElementById("winning-number-input-2");
    const number3 = document.getElementById("winning-number-input-3");
    const number4 = document.getElementById("winning-number-input-4");
    const number5 = document.getElementById("winning-number-input-5");
    const number6 = document.getElementById("winning-number-input-6");

    const winningNumbers = Validator.validateWinningNumbers([
      number1.value,
      number2.value,
      number3.value,
      number4.value,
      number5.value,
      number6.value,
    ]);

    const bonusNumber = Validator.validateBonusNumber(
      document.getElementById("bonus-number-input").value,
      winningNumbers,
    );

    const luckyNumbers = {
      winningNumbers,
      bonusNumber,
    };

    const resultCalculator = new LottoResultCalculator();
    const winningResult = resultCalculator.calculateWinningRank(
      lottos,
      luckyNumbers,
    );

    OutputView.printMatchResult(winningResult);

    const profitRate = resultCalculator.calculateProfitRate(
      winningResult,
      purchasePrice,
    );

    OutputView.printProfitRate(profitRate);
  } catch (e) {
    window.alert(e.message);
  }
});

restartButton.addEventListener("click", () => {
  window.location.reload();
});
