import LottoAppModel from './Model/LottoAppModel.js';
import LottoAppView from './View/LottoAppView.js';
import LottoAppController from './Controller/LottoAppController.js';
import { $ } from './utils/utils.js';

export default class App {
  constructor() {
    const lottoAppModel = new LottoAppModel();
    const lottoAppView = new LottoAppView($('#app'));
    this.controller = new LottoAppController(lottoAppModel, lottoAppView);
  }

  init() {
    this.controller.init();
  }
}
