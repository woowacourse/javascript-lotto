import LottoResultsHelper from '../../domains/LottoResultsHelper';
import HtmlTextInjectorWithConstants from './HtmlTextInjectorWithConstants';
import LottoMachineGenerator from './LottoMachineGenerator';
import RuleDisplayController from './RuleDisplayController';

class WebLottoGameController {
  #lottoResultsHelper = new LottoResultsHelper();

  #statistics = {};

  constructor() {
    this.#setTextContextWithConstants();
    this.#handleLottoMachineGenerator();
  }

  #setTextContextWithConstants() {
    RuleDisplayController.addEventToggleRule();

    HtmlTextInjectorWithConstants.injectorText();
  }

  #handleLottoMachineGenerator() {
    // eslint-disable-next-line
    const lottoMachineGenerator = new LottoMachineGenerator(
      this.#lottoResultsHelper,
    );
  }
}
export default WebLottoGameController;
// eslint-disable-next-line
new WebLottoGameController();
