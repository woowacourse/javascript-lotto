import LottoWebInputView from "../view/LottoWebInputView.js";
import LottoWebOutputView from "../view/LottoWebOutputView.js";
import PurchaseController from "./PurchaseController.js";
import ResultController from "./ResultController.js";
import StatisticsModalController from "./StatisticsModalController.js";

class LottoWebController {
  constructor() {
    this.state = {
      money: 0,
      randomLottos: [],
      result: null,
      profit: 0,
    };

    this.inputView = new LottoWebInputView();
    this.outputView = new LottoWebOutputView();

    this.purchaseController = new PurchaseController(
      this.state,
      this.inputView,
      this.outputView,
    );
    this.resultController = new ResultController(
      this.state,
      this.inputView,
      this.outputView,
    );
    this.statisticsModalController = new StatisticsModalController(
      this.state,
      this.inputView,
      this.outputView,
    );
  }

  play() {
    this.purchaseController.bindEvents();
    this.resultController.bindEvents();
    this.statisticsModalController.bindEvents();
  }
}

export default LottoWebController;
