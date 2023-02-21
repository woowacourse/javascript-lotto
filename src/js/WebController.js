import PurchaseView from "./PurchaseView";
import LotteriesView from "./LotteriesView";
import LottoGame from "../domain/LottoGame";
import Validation from "../Validation";
import WinningNumbersView from "./WinningNumbersView";

class WebController {
  #lottoNumbers = [];
  #bonusNumber;
  #lottoGame;

  constructor() {
    this.purchaseView = new PurchaseView(this.submitPurchaseAmount);
  }

  submitPurchaseAmount = (event) => {
    event.preventDefault();
    const amount = Number(this.purchaseView.purchaseInput.value);
    try {
      Validation.purchaseAmount(amount);
      this.#lottoGame = new LottoGame(amount);
      this.showLotteries(this.#lottoGame.getLotteries());
    } catch (error) {
      alert(error.message);
      // reset value & disable button
    }
  };

  showLotteries(lotteries) {
    const lotteriesView = new LotteriesView(lotteries);
    lotteriesView.showLotteries(lotteries);
    this.disableButton(this.purchaseView.purchaseButton);
    this.handleWinningNumbers();
  }

  disableButton(button) {
    button.disabled = true;
  }

  handleWinningNumbers() {
    this.winningNumbersView = new WinningNumbersView(this.submitWinningNumbers);
  }

  submitWinningNumbers = (event) => {
    event.preventDefault();
    const inputLottoNumbers = this.winningNumbersView.lottoNumbers;
    const lottoNumbers = [];
    Array.from(inputLottoNumbers).forEach((lottery) => {
      lottoNumbers.push(Number(lottery.value));
    });
    try {
      Validation.lottoNumbers(lottoNumbers);
      this.#lottoNumbers = lottoNumbers;
    } catch (error) {
      alert(error.message);
      //reset value
    }

    console.log(this.#lottoNumbers);
    console.log(this.#lottoGame.getLotteries());
  };
}

export default WebController;
