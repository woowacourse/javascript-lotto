import PurchaseLottosController from './controllers/PurchaseLottosController.js';
import CheckWinningLottosController from './controllers/CheckWinningLottosController.js';
import LottoMachine from './models/LottoMachine.js';

function App() {
  window.addEventListener('DOMContentLoaded', () => {
    const lottoMachine = new LottoMachine();
    new PurchaseLottosController(lottoMachine);
    new CheckWinningLottosController(lottoMachine);
    const modal = document.querySelector('.modal');
    document.querySelector('#exit').addEventListener('click', () => {
      modal.classList.toggle('show');
      console.log(modal.classList);
    });
  });
}
export default App;
