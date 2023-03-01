import LottoService from '../domain/LottoService';

class WebController {
  #lottoService;

  constructor() {
    this.#lottoService = new LottoService();
  }

  purchaseLotto(amount) {
    this.#lottoService.purchaseLottos(amount);
  }

  getLottosNumbers() {
    return this.#lottoService.getLottosNumbers();
  }

  setWinningLotto(winNumbers, bonusNumber) {
    this.#lottoService.setWinningLotto(winNumbers, bonusNumber);
  }

  getStatstics() {
    const statstics = this.#lottoService.getStatstics();
    const profitRate = this.#lottoService.getProfitRate(statstics);
    return { statstics, profitRate };
  }
}

export default WebController;
