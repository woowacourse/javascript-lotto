import LottoList from "./view/web/LottoList.js";
import MoneyInput from "./view/web/MoneyInput.js";
import ResultModal from "./view/web/ResultModal.js";
import WinningInput from "./view/web/WinningInput.js";
import LottoMachine from "./service/LottoMachine.js";

class App {
  constructor() {
    this.views = {
      money: new MoneyInput(),
      modal: new ResultModal(),
      list: new LottoList(),
      winning: new WinningInput(),
    };

    this.service = new LottoMachine();
  }

  init() {
    this.views.money.bindPurchase((money) => this.handlePurchase(money));
    this.views.winning.bindCalculate((data) =>
      this.handleCalculateResults(data),
    );
    this.views.modal.bindCloseModal();
    this.views.modal.bindReset(() => this.handleReset());
  }

  handlePurchase(money) {
    try {
      const lottos = this.service.issueLottos(money);
      this.views.list.renderLottoList(lottos);
      this.views.winning.showWinningInput();
    } catch (error) {
      alert(error.message);
    }
  }

  handleCalculateResults({ winningNumbers, bonusNumber }) {
    try {
      const { countMatchRank, returnOnInvestment } =
        this.service.calculateResult(winningNumbers, bonusNumber);

      console.log(countMatchRank, returnOnInvestment);
      this.views.modal.renderResult(countMatchRank, returnOnInvestment);
    } catch (error) {
      alert(error.message);
    }
  }

  handleReset() {
    this.service = new LottoMachine();
    this.views.money.reset();
    this.views.modal.reset();
    this.views.list.reset();
    this.views.winning.reset();

    console.log("앱이 초기화되었습니다.");
  }
}

export default App;
