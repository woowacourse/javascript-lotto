import LottoGame from "./domain/LottoGame";
import Validation from "./Validation";
import PurchaseView from "./view/web/PurchaseView";
import LotteriesView from "./view/web/LotteriesView";
import WinningNumbersView from "./view/web/WinningNumbersView";
import ModalView from "./view/web/ModalView";

class App {
  #lottoNumbers = [];
  #bonusNumber;
  #lottoGame;

  constructor() {
    this.purchaseView = new PurchaseView(this.submitPurchaseAmount);
    this.modalView = new ModalView(
      this.handleCloseModal,
      this.handleRestartGame
    );
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
      this.#resetValue(this.purchaseView.purchaseInput);
    }
  };

  #resetValue(input) {
    input.value = null;
  }

  #toggleButton(button) {
    button.disabled = !button.disabled;
  }

  showLotteries(lotteries) {
    this.lotteriesView = new LotteriesView(lotteries);
    this.lotteriesView.showLotteries(lotteries);
    this.#toggleButton(this.purchaseView.purchaseButton);
    this.handleWinningNumbers();
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
    const bonusNumber = this.winningNumbersView.bonusNumber.value;
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
      this.#toggleButton(this.winningNumbersView.resultButton);
    } catch (error) {
      alert(error.message);
    }
  };

  handleCloseModal = (event) => {
    event.preventDefault();
    this.modalView.hiddenModal();
    this.#toggleButton(this.winningNumbersView.resultButton);
  };

  handleRestartGame = (event) => {
    event.preventDefault();
    this.winningNumbersView.bonusNumber.value = null;
    this.lotteriesView.hideLotteriesView();
    this.modalView.hiddenModal();
    this.winningNumbersView.hideWinningContainer();
    this.#resetValue(this.purchaseView.purchaseInput);
    this.#toggleButton(this.purchaseView.purchaseButton);
    this.#toggleButton(this.winningNumbersView.resultButton);
  };
}

export default App;
