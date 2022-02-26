import LottoModel from './models/LottoModel.js';
import LottoView from './views/LottoView.js';
import LottoController from './controllers/LottoController.js';
import { $ } from './utils/utils.js';
import { SELECTOR } from './configs/contants.js';

export default class App {
  constructor() {
    const lottoAppModel = new LottoModel();
    const lottoAppView = new LottoView($(SELECTOR.APP));
    this.controller = new LottoController(lottoAppModel, lottoAppView);
  }

  init() {
    this.controller.init();
  }
}
