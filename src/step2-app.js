import LottoGame from './domain/LottoGame';
import enterGameBoard from './components/enterGameBoard';
import purchaseLottoStatus from './components/purchaseLottoStatus';
import lottoResultBoard from './components/lottoRresult';
import { clearConatiner } from './utils/Utils';

class App {
  #$app;
  #state;

  lottoGame = new LottoGame();

  constructor($app) {
    this.#$app = $app;
    this.paintLottoStatus();
    this.paintEnterWinningNumber();
  }

  paintEnterWinningNumber() {
    const $lottoSection = document.querySelector('.lotto-section');
    $lottoSection.appendChild(enterGameBoard(this.showModalCallback));
  }

  paintLottoStatus() {
    const $lottoSection = document.querySelector('.lotto-section');
    this.lottoGame.purchaseLottos(5000);

    const $board = purchaseLottoStatus(this.lottoGame.getLottoNumbers());
    $lottoSection.appendChild($board);
  }

  showModalCallback() {
    const $modal = document.querySelector('.modal');
    $modal.classList.add('is-active');

    const $modalContent = document.querySelector('.modal-content');
    clearConatiner($modalContent);

    $modalContent.appendChild(
      lottoResultBoard(
        {
          FIFTH: 0,
          FOURTH: 0,
          THIRD: 0,
          SECOND: 0,
          FIRST: 0,
        },
        0.0
      )
    );

    // this.retrySetting();
  }

  closeModalCallback() {
    const $modal = document.querySelector('.modal');
    $modal.classList.remove('is-active');
  }

  retrySetting() {
    const $retry = document.getElementById('retry');
    $retry.addEventListener('click', this.closeModalCallback);
  }
}

export default App;
