import LottoModel from './models/LottoModel.js';
import AppView from './views/AppView.js';
import AppController from './controllers/AppController.js';
import { $ } from './utils/utils.js';
import { SELECTOR } from './configs/contants.js';

export default class App {
  constructor() {
    const lottoModel = new LottoModel();
    const appView = new AppView($(SELECTOR.APP));
    this.controller = new AppController(lottoModel, appView);
  }

  init() {
    this.controller.init();
  }
}
