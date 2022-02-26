import { SELECTOR } from '../constants/selector';
import { findElement } from '../utils/elementSelector';

class LottoGameView {
  constructor() {
    this.$purchasedMessage = findElement(SELECTOR.PURCHASED_MESSAGE);
    this.$lottoContainer = findElement(SELECTOR.LOTTO_CONTAINER);
  }

  renderLottoSection(lottoList) {
    this.$purchasedMessage.innerText = `총 ${lottoList.length}개를 구매하였습니다.`;
    this.$lottoContainer.innerHTML = lottoList
      .map((lotto) => this.generateLottoTemplate(lotto))
      .join('');
  }

  generateLottoTemplate({ lottoNumbers }) {
    return `<div class="lotto">
      <span>🎟️</span>
      <span class="number">${lottoNumbers.join(', ')}</span>
      </div>`;
  }

  renderAlignState(visibleState) {
    this.$lottoContainer.setAttribute('data-visible-state', visibleState);
  }
}
export default LottoGameView;
