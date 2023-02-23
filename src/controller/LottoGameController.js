import LottoMachine from '../domain/LottoMachine';
import LottoStatistics from '../domain/LottoStatistics';
import { LOTTO_NUMBERS_COUNT, LOTTO_UNIT_PRICE } from '../domain/constants';

import CheckWinningSection from '../view/CheckWinningSection/index';
import WinningStatModal from '../view/WinningStatModal/index';

import { $ } from '../utils/dom';

class LottoGameController {
  #checkWinningSection;

  #winningStatModal;

  #lottoMachine;

  constructor($target) {
    this.renderCheckWinningSection($target);
    $target.addEventListener('purchaseLotto', (e) =>
      this.handleLottoPurchase(e.detail)
    );
    $target.addEventListener('checkResult', (e) =>
      this.handleResultCheck(e.detail)
    );
  }

  renderCheckWinningSection() {
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
    const [bonusNumber] = numbers.slice(-1);
    const lottoStatistics = new LottoStatistics(
      numbers.slice(0, LOTTO_NUMBERS_COUNT),
      bonusNumber
    );
    const { lottos } = this.#lottoMachine;
    const allLottosRank = lottoStatistics.determineAllLottosRank(lottos);

    this.renderResultModal(
      allLottosRank,
      lottoStatistics.calculateProfitRate(
        allLottosRank,
        lottos.length * LOTTO_UNIT_PRICE
      )
    );
  }

  renderResultModal(allLottosRank, profitRate) {
    $('.modal').classList.toggle('hidden');
    this.#winningStatModal = new WinningStatModal($('.modal'));
    this.#winningStatModal.render();
    this.#winningStatModal.renderResult(allLottosRank);
    this.#winningStatModal.renderProfitRate(profitRate);
  }
}

export default LottoGameController;
