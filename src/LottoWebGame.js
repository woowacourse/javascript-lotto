import Lotto from './domain/models/Lotto';
import { LOTTO } from './constants';

class LottoWebGame {
  #lottos;

  constructor() {
    this.#lottos = [];
    this.bindEvents();
  }

  bindEvents = () => {
    $('#buy-button').addEventListener('click', this.handleBuyButton);
  };

  handleBuyButton = () => {
    const input = $('#purchase-amount').value;
    try {
      lottoGameValidator.checkPurchaseAmount(input);
      this.initLottos(Number(input));
      this.renderLottos();
      $('.hidden-area').classList.add('show');
    } catch (e) {
      alert(e.message);
    }
  };

  initLottos = (purchaseAmount) => {
    this.#lottos = Array.from({ length: purchaseAmount / LOTTO.price }, this.drawLotto);
  };

  drawLotto = () => {
    const randomNumbers = Array.from(
      { length: LOTTO.maxNumber - LOTTO.minNumber + 1 },
      (_, i) => i + LOTTO.minNumber
    )
      .sort(() => Math.random() - 0.5)
      .slice(0, LOTTO.numbersLength)
      .sort((a, b) => a - b);

    return new Lotto(randomNumbers);
  };

  renderLottos = () => {
    $('#buy-count').innerHTML = `총 ${this.#lottos.length}개를 구매하였습니다.`;
    $('#lotto-numbers-area').innerHTML = this.#lottos
      .map((lotto) => `<p>${lotto.getNumbers().join(', ')}</p>`)
      .join('');
  };
}

export default LottoWebGame;
