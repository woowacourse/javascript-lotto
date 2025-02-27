import LottoGame from "../../domain/LottoGame.js";
import LottoInput from "./components/LottoInput.js";
import LottoList from "./components/LottoList.js";
import WinningNumber from "./components/WinningNumber.js";
import ResultModal from "./components/ResultModal.js";

export default class WebApp {
  constructor() {
    this.lottoGame = null;
    this.lottoList = new LottoList();
    this.lottoInput = new LottoInput(this.handlePurchase.bind(this));
    this.winningNumber = new WinningNumber(this.handleResult.bind(this));
    this.resultModal = new ResultModal(this.resetGame.bind(this));
  }

  handlePurchase(lottoNum) {
    this.lottoGame = new LottoGame(lottoNum);
    this.lottoList.displayLottos(this.lottoGame.lottos);
    this.winningNumber.show();
  }

  handleResult(winningNumbers, bonusNumber) {
    this.lottoGame.calculate(winningNumbers, bonusNumber);
    const gameResult = this.lottoGame.getGameResult();
    const earningRate = this.lottoGame.getEarningRate(
      this.lottoGame.lottos.length,
    );

    this.resultModal.displayResult(gameResult, earningRate);
  }

  resetGame() {
    this.lottoGame = null;
    this.lottoInput.reset();
    this.winningNumber.reset();
    this.lottoList.clear();
  }
}
