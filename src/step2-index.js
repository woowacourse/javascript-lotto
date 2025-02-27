import LottoGame from "./domain/LottoGame.js";
import LottoInput from "./view/web/components/LottoInput.js";
import LottoList from "./view/web/components/LottoList.js";
import WinningNumbers from "./view/web/components/WinningNumber.js";
import ResultModal from "./view/web/components/ResultModal.js";

let lottoGame = null;
let lottoInput = null;
let lottoList = null;
let winningNumbers = null;
let resultModal = null;

function handlePurchaseCallback(lottoNum) {
  lottoGame = new LottoGame(lottoNum);
  lottoList.displayLottos(lottoGame.lottos);
  winningNumbers.show();
}

function handleResultCallback(targetNumbers, bonusNumber) {
  lottoGame.calculate(targetNumbers, bonusNumber);
  const gameResult = lottoGame.getGameResult();
  const earningRate = lottoGame.getEarningRate(lottoGame.lottos.length);

  resultModal.displayResult(gameResult, earningRate);
}

function handleRestartCallback() {
  lottoGame = null;
  lottoInput.reset();
  lottoList.clear();
  winningNumbers.reset();
}

function initApp() {
  lottoInput = new LottoInput(handlePurchaseCallback);
  lottoList = new LottoList();
  winningNumbers = new WinningNumbers(handleResultCallback);
  resultModal = new ResultModal(handleRestartCallback);
}

initApp();
