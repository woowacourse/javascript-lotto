import enterGameBoard from './view/components/enterGameBoard';

class App {
  #$app;
  #state;

  constructor($app) {
    this.#$app = $app;

    this.paintLottoResult();
  }

  paintLottoResult() {
    const $lottoSection = document.querySelector('.lotto-section');
    $lottoSection.appendChild(enterGameBoard());
  }
}

export default App;
