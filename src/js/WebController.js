import PurchaseView from "../view/PurchaseView";
import LotteriesView from "../view/LotteriesView";
import LottoGame from "../domain/LottoGame";
import Validation from "../Validation";
import WinningNumbersView from "../view/WinningNumbersView";
import ModalView from "../view/ModalView";

class WebController {
  #lottoNumbers = [];
  #bonusNumber;
  #lottoGame;

  constructor() {
    this.purchaseView = new PurchaseView(this.submitPurchaseAmount);
    this.modalView = new ModalView();
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
      this.resetValue(this.purchaseView.purchaseInput);
    }
  };

  resetValue(input) {
    input.value = null;
  }

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
    this.winningNumbersView.makeLottoInput();
    this.lottoInput = document.querySelectorAll(".lotto-input");
  }

  submitWinningNumbers = (event) => {
    event.preventDefault();
    const inputLottoNumbers = [...this.lottoInput];
    const lottoNumbers = inputLottoNumbers.reduce((arr, cur) => {
      return [...arr, +cur.value];
    }, []);
    const bonusNumber = this.winningNumbersView.bonusNumber[0].value;
    try {
      Validation.lottoNumbers(lottoNumbers);
      this.#lottoNumbers = lottoNumbers;
      Validation.bonusNumber(this.#lottoNumbers, +bonusNumber);
      this.#bonusNumber = +bonusNumber;
      const lottoResult = this.#lottoGame.calculateRankResult(
        this.#lottoNumbers,
        this.#bonusNumber
      );
      this.modalView.showResult(lottoResult);
    } catch (error) {
      alert(error.message);
      //reset value
    }
  };

  handleModal() {}

  closeModal() {
    this.modalView.style.display = "none";
  }
}

export default WebController;
