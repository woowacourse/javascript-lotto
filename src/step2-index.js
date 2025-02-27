import calcProfitRate from "./domain/calcProfitRate.js";
import formatResults from "./domain/formatResults.js";
import LottoGame from "./models/LottoGame.js";
import {
  getBonusNumber,
  getLottoPrice,
  getWinningNumbers,
} from "./uiView/input.js";
import {
  printLottoCount,
  printLottoNumbers,
  printProfitRate,
  printResult,
} from "./uiView/output.js";

// /**
//  * step 2의 시작점이 되는 파일입니다.
//  * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
//  */
const lottoGame = new LottoGame();
let lottos;

const init = async () => {
  document
    .querySelector(".purchase button")
    .addEventListener("click", handlePurchaseClick);

  const inputs = document.querySelectorAll(".inputs__winning-number input");
  inputs.forEach((input) => {
    input.addEventListener("input", () => handleInputChange(inputs));
  });

  document
    .querySelector(".winning-lotto .result")
    .addEventListener("click", handleResultClick);
};

const handlePurchaseClick = (e) => {
  const price = getLottoPrice();
  if (price) {
    e.target.disabled = true;
    lottos = lottoGame.generateLottos(price);

    printLottoCount(lottos.length);

    const lottoListEl = document.createElement("ul");
    lottoListEl.classList.add("lotto-list");
    document.querySelector(".purchase-history .count").after(lottoListEl);

    lottos.forEach((lotto) => printLottoNumbers(lotto.numbers));

    document.querySelector(".winning-lotto").classList.add("active");
  }
};

const handleInputChange = (inputs) => {
  const allFilled = Array.from(inputs).every(
    (input) => input.value.trim() !== ""
  );
  console.log(allFilled);
  document.querySelector(".winning-lotto .result").disabled = !allFilled;
};

const handleResultClick = () => {
  document.querySelector(".overlay").classList.add("active");

  if (document.querySelector(".result-row")) return;

  const winningNumbers = getWinningNumbers();
  const bonusNumber = getBonusNumber(winningNumbers);

  const gameResults = lottoGame.playLotto(lottos, {
    winningNumbers,
    bonusNumber,
  });

  const totalReward = lottoGame.calcTotalReward(gameResults);
  const rankCount = lottoGame.getRankCount(gameResults);

  printResult(formatResults(rankCount).reverse());
  printProfitRate(calcProfitRate(getLottoPrice(), totalReward));
};

init();
