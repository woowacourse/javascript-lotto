import './css/index.css';
import LottoMachineController from './js/controller/LottoMachineController.js';

const app = {
  init() {
    new LottoMachineController();
  },
};

Number.prototype.toKorean = function () {
  return this.toLocaleString('ko-KR');
};

app.init();
