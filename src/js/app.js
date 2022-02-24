import LottoMachineController from './controller/LottoMachineController.js';

export default class App {
  constructor() {
    this.init();
  }

  init() {
    this.lottoMachineController = new LottoMachineController();
  }
}
