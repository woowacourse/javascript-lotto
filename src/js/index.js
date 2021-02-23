import { LottoView } from './view/index.js';
import { LottoController } from './controller/index.js';
import { LottoMachine } from './model/index.js';

class App {
  constructor() {
    this.init();
  }

  init() {
    const controller = new LottoController(new LottoMachine(), new LottoView());

    controller.initEvent();
  }
}

new App();
