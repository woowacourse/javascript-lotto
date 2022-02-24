import LottoAppModel from './models/LottoAppModel.js';
import LottoAppView from './views/LottoAppView.js';
import LottoAppController from './controllers/LottoAppController.js';
import { $ } from './utils/utils.js';
import { SELECTOR } from './configs/contants.js';

export default class App {
  constructor() {
    const lottoAppModel = new LottoAppModel();
    const lottoAppView = new LottoAppView($(SELECTOR.APP));
    this.controller = new LottoAppController(lottoAppModel, lottoAppView);
  }

  init() {
    this.controller.init();
  }
}
