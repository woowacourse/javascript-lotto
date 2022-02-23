import { selectDom } from '../utils/utils';
import LottoManager from '../model/lottoManager';

class LottoController {
  startLotto() {
    // dom 불러오기
    this.cashInputSection = selectDom('.cash-input-section');
    // 이벤트 리스너 달기
    this.cashInputSection.addEventListener('click', this.onCashInputButtonClick);
  }

  onCashInputButtonClick(e) {
    e.preventDefault();
    const { target } = e;
    if (target.className === 'cash-input-button') {
      const { value: cashInput } = selectDom('.cash-input', this.cashInputSection);
      this.lottoManager = new LottoManager();
      this.lottoManager.buyLotto(cashInput);
    }
  }
}

export default LottoController;
