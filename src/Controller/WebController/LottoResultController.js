import LottoList from "../../Model/LottoList.js";

import { AMOUNT_PRICE } from "../../constants/lottoConstants.js";

import StatisticsResultController from "./StatisticsResultController.js";

class LottoResultController {
  view;
  model;
  constructor(view) {
    this.view = view;
    this.model = {};
  }
  run(amount) {
    const lottoList = new LottoList(amount);
    this.model.lottoList = lottoList;

    this.view.outputView.renderLottoResult({ amount, lottoList });
    this.#inputLottoNumber();
  }
  #inputLottoNumber() {
    this.view.inputView.readLottoNumber((winningNumbers, bonusNumber) => {
      const statisticsResultController = new StatisticsResultController(
        this.view,
      );

      statisticsResultController.run(
        winningNumbers,
        bonusNumber,
        this.model.lottoList,
      );
    });
  }
}

export default LottoResultController;
