import LottoGame from './domain/LottoGame';
import enterGameBoard from './view/components/enterGameBoard';
import purchaseLottoStatus from './view/components/purchaseLottoStatus';

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
    $lottoSection.appendChild(enterGameBoard());
  }

  paintLottoStatus() {
    const $lottoSection = document.querySelector('.lotto-section');
    this.lottoGame.purchaseLottos(5000);

    const $board = purchaseLottoStatus(this.lottoGame.getLottoNumbers());
    $lottoSection.appendChild($board);
  }
}

export default App;
