import LottoMachine from '../domain/LottoMachine';

import CheckWinningSection from '../view/CheckWinningSection/index';

import { $ } from '../utils/dom';

class LottoPurchaseController {
  #checkWinningSection;

  #lottoMachine;

  constructor($target) {
    this.$target = $target;
    this.$target.addEventListener('purchaseLotto', (e) =>
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
  }
}

export default LottoPurchaseController;
