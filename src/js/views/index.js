import { SELECTOR } from '../constants/selector';
import { findElement } from '../utils/elementSelector';

class LottoGameView {
  constructor() {
    this.#initializeDOM();
  }

  #initializeDOM() {
    this.$purchasedMessage = findElement(SELECTOR.PURCHASED_MESSAGE);
    this.$lottoContainer = findElement(SELECTOR.LOTTO_CONTAINER);
  }

  renderLottoSection(lottoList) {
    this.renderPurchasedMessage(lottoList.length);
    this.renderLottoList(lottoList);
  }

  renderLottoList(lottoList) {
    this.$lottoContainer.innerHTML = lottoList
      .map((lotto) => this.generateLottoTemplate(lotto))
      .join('');
  }

  renderPurchasedMessage(lottoAmount) {
    this.$purchasedMessage.innerText = `총 ${lottoAmount}개를 구매하였습니다.`;
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
