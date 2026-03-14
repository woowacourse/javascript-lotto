import LottoList from "../../Model/LottoList.js";
import LottoResultView from "../../View/WebView/LottoResultView.js";

import { AMOUNT_PRICE } from "../../constants/lottoConstants.js";

import StatisticsResultController from "./StatisticsResultController.js";

class LottoResultController {
  view;
  model;
  constructor() {
    this.view = new LottoResultView();
    this.model = {};
  }
  run(amount) {
    const lottoList = new LottoList(amount);
    this.model.lottoList = lottoList;

    this.view.render({ amount, lottoList });
    this.view.bindEvent((winningNumbers, bonusNumber) => {
      this.#inputLottoNumbers(winningNumbers, bonusNumber);
    });
  }
  #inputLottoNumbers(winningNumbers, bonusNumber) {
    const statisticsResultController = new StatisticsResultController();

    statisticsResultController.run(
      winningNumbers,
      bonusNumber,
      this.model.lottoList,
    );
  }
}

export default LottoResultController;
