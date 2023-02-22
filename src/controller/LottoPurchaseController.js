import LottoMachine from '../domain/LottoMachine';

import CheckWinningSection from '../view/CheckWinningSection/index';

import { $ } from '../utils/dom';

class LottoPurchaseController {
  #checkWinningSection;

  #lottoMachine;

  constructor($target) {
    $target.addEventListener('purchaseLotto', (e) =>
      this.handlePurchaseLotto(e.detail)
    );

    this.#checkWinningSection = new CheckWinningSection(
      $('.check-winning-section')
    );
    this.#checkWinningSection.render();
  }

  handlePurchaseLotto(purchasePrice) {
    this.#lottoMachine = new LottoMachine(purchasePrice);
    this.#checkWinningSection.renderLottos(this.#lottoMachine.lottos);
    this.#checkWinningSection.renderWinningNumbersForm();
  }
}

export default LottoPurchaseController;
