import './css/index.css';
import LottoMachineController from './js/controller/LottoMachineController.js';

export default class App {
  constructor() {
    this.lottoMachineController = new LottoMachineController();
  }
}

new App();
