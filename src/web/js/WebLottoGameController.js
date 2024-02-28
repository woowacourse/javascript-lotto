import LottoResultsHelper from '../../domains/LottoResultsHelper';
import HtmlTextInjectorWithConstants from './HtmlTextInjectorWithConstants';
import LottoMachineGenerator from './LottoMachineGenerator';
import StatisticsPopupController from './StatisticsPopupController';
import WinningLottoAndBonusGenerator from './WinningLottoAndBonusGenerator';

class WebLottoGameController {
  #lottoResultsHelper = new LottoResultsHelper();

  #statistics = {};

  constructor() {
    this.#setTextContextWithConstants();
    this.#handleLottoMachineGenerator();
  }

  #setTextContextWithConstants() {
    HtmlTextInjectorWithConstants.injectorText();
  }

  #handleLottoMachineGenerator() {
    // eslint-disable-next-line
    const lottoMachineGenerator = new LottoMachineGenerator(
      this.#lottoResultsHelper,
    );
    // eslint-disable-next-line
    const winning = new WinningLottoAndBonusGenerator(this.#lottoResultsHelper);

    if (this.#lottoResultsHelper.results) {
      // eslint-disable-next-line
      const statisticsPopupController = new StatisticsPopupController(
        this.#lottoResultsHelper,
      );
    }
  }
}
export default WebLottoGameController;
// eslint-disable-next-line
new WebLottoGameController();
