import { selectDom } from '../utils/utils';

class LottoView {
  constructor() {
    this.initDom();
  }

  initDom() {
    this.purchasedLottoSection = selectDom('.purchased-lotto-section');
    this.winnerNumberSection = selectDom('.winner-number-section');
  }

  renderLottos(lottos) {
    this.purchasedLottoSection.classList.remove('hide');
    this.winnerNumberSection.classList.remove('hide');
  }
}
export default LottoView;
