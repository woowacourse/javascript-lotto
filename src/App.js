import LottoController from './LottoController';

class App {
  constructor() {
    this.lottoController = new LottoController();
  }

  async play() {
    this.repeatGame();
  }

  async repeatGame() {
    await this.playGame();
    const restart = await this.lottoController.proceedRestartCommand();
    if (!restart) {
      return;
    }
    this.repeatGame();
  }

  async playGame() {
    await this.lottoController.proceedBuyLottos();
    await this.lottoController.proceedWinningLotto();
    await this.lottoController.proceedBonusNumber();
    this.lottoController.proceedLottoResult();
  }
}

export default App;
