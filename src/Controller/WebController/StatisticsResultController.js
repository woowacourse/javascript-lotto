import { AMOUNT_PRICE } from "../../constants/lottoConstants.js";
import LottoGame from "../../Model/LottoGame.js";
import Rate from "../../Model/Rate.js";
import StatisticsResultView from "../../View/WebView/StatisticsResultView.js";

class StatisticsResultController {
  constructor() {
    this.view = new StatisticsResultView();
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

    this.view.render({
      statistics,
      rate: rate.getRate(),
      lottoList,
    });
    this.#inputIsReady();
  }
  #inputIsReady() {
    this.view.readIsRetry(() => {
      this.view.printReset();
    });
  }
}

export default StatisticsResultController;
