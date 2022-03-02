import PurchaseLottosController from './controllers/PurchaseLottosController.js';
import CheckWinningLottosController from './controllers/CheckWinningLottosController.js';
import LottoMachine from './models/LottoMachine.js';

function App() {
  window.addEventListener('DOMContentLoaded', () => {
    const lottoMachine = new LottoMachine();
    new PurchaseLottosController(lottoMachine);
    new CheckWinningLottosController(lottoMachine);
    const modal = document.querySelector('.modal');
    const toggle = document.querySelector('#lotto-result-toggle');
    document.querySelector('#exit').addEventListener('click', () => {
      modal.classList.toggle('show');
      console.log(modal.classList);
      toggle.classList.toggle('hide');
      console.log(toggle.classList);
    });
  });
}
export default App;
