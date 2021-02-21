import { LottoController } from './controller/index.js';

class App {
  constructor() {
    this.init();
  }

  init() {
    const controller = new LottoController();

    controller.initEvent();
  }
}

new App();
