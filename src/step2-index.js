import { ResultController } from "./controller/ResultController.js";
import WinningLotto from "./domain/WinningLotto.js";
import { getLottoArray, getLottoCount } from "./service/PurchaseService.js";
import { displayCount, displayLotto, displayResultButton } from "./ui/displayLotto.js";
import { displayWinning } from "./ui/displayWinning.js";

const runLotto = () => {
  purchaseLotto();
};

const purchaseLotto = () => {
  const lottoArray = [];
  document.querySelector(".purchase-button").addEventListener("click", () => {
    const inputPrice = document.querySelector(".price-input").value;

    const lottoCount = getLottoCount(inputPrice);
    displayCount(lottoCount);

    lottoArray.push(...getLottoArray(lottoCount));
    displayLotto(lottoArray);
    displayWinning();
    displayResultButton();

    displayResult(lottoArray);
  });
};

const displayResult = (lottoArray) => {
  const resultButton = document.querySelector(".result-button");

  if (resultButton) {
    resultButton.addEventListener("click", () => {
      console.log(setResult(lottoArray));
      // 모달창
    });
  }
};

// parsing 리팩토링
const setWinningLotto = () => {
  const winningInputs = document.querySelectorAll(".winning-input");
  const winningNumbers = [];
  winningInputs.forEach((input) => winningNumbers.push(Number(input.value)));

  const bonusNumber = Number(document.querySelector(".bonus-input").value);

  const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
  return winningLotto;
};

const setResult = (lottoArray) => {
  const winningLotto = setWinningLotto();
  const matchingCount = ResultController(winningLotto, lottoArray);
  return matchingCount;
};

runLotto();
