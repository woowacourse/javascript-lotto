import LottoMachine from '../domain/LottoMachine';

import CheckWinningSection from '../view/CheckWinningSection/index';

import { $ } from '../utils/dom';

class LottoGameController {
  #checkWinningSection;

  #lottoMachine;

  constructor($target) {
    $target.addEventListener('purchaseLotto', (e) =>
      this.handleLottoPurchase(e.detail)
    );
    $target.addEventListener('checkResult', (e) =>
      this.handleResultCheck(e.detail)
    );

    this.#checkWinningSection = new CheckWinningSection(
      $('.check-winning-section')
    );
    this.#checkWinningSection.render();
  }

  handleLottoPurchase(purchasePrice) {
    this.#lottoMachine = new LottoMachine(purchasePrice);
    this.#checkWinningSection.renderLottos(this.#lottoMachine.lottos);
    this.#checkWinningSection.renderWinningNumbersForm();
  }

  handleResultCheck(numbers) {
    const lottoStatistics = new LottoStatistics(
      numbers.slice(0, LOTTO_NUMBERS_COUNT),
      numbers.slice(-1)
    );

    this.renderResultModal(
      lottoStatistics.determineAllLottosRank(this.#lottoMachine.lottos)
    );
  }

  renderResultModal(allLottosRank) {
    console.log(allLottosRank);
    $('.modal').classList.toggle('hidden');
    new WinningStatModal($('.modal')).render();
  }
}

export default LottoGameController;
