import { AMOUNT_PRICE } from "../../constants/lottoConstants.js";
import LottoGame from "../../Model/LottoGame.js";
import Rate from "../../Model/Rate.js";

class StatisticsResultController {
  view;
  model;
  constructor(view, model) {
    this.view = view;
    this.model = {};
  }
  run(winningNumbers, bonusNumber, lottoList) {
    const lottoGame = new LottoGame(winningNumbers, bonusNumber);
    this.model.lottoGame = lottoGame;
    const statistics = lottoGame.getStatistics(lottoList);

    const rate = new Rate(
      statistics,
      lottoList.getLottoList().length * AMOUNT_PRICE,
    );
    this.model.rate = rate;

    this.view.outputView.renderStatisticsResult({
      statistics,
      rate: rate.getRate(),
    });
    this.#inputIsReady();
  }
  #inputIsReady() {
    this.view.inputView.readIsRetry(() => {
      this.view.outputView.printReset();
    });
  }
}

export default StatisticsResultController;
