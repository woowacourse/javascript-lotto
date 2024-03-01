import LottoResultsHelper from '../../domains/LottoResultsHelper';
import HtmlTextInjectorWithConstants from './HtmlTextInjectorWithConstants';
import LottoMachineGenerator from './LottoMachineGenerator';
import WinningLottoAndBonusGenerator from './WinningLottoAndBonusGenerator';

class WebLottoGameController {
  #lottoResultsHelper = new LottoResultsHelper();

  constructor() {
    this.#setTextContextWithConstants();
    this.#handleLottoMachineGenerator();
  }

  #setTextContextWithConstants() {
    HtmlTextInjectorWithConstants.injectorText();
  }

  #handleLottoMachineGenerator() {
    new LottoMachineGenerator(this.#lottoResultsHelper);
    new WinningLottoAndBonusGenerator(this.#lottoResultsHelper);
  }
}
export default WebLottoGameController;
