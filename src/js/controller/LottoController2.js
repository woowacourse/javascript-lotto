import OPTIONS from '../constant/Options.js';
import LottoMachine from '../domain/LottoMachine.js';

class LottoController2 {
  #lottoMachine = new LottoMachine();

  #lottos;

  issueLottosWithPrint(purchaseAmount) {
    this.#issueLottos(purchaseAmount);

    this.#printLottoInfos();

    this.#showComponentByClass('.lotto-info');
    this.#showComponentByClass('.result-form');
  }

  #issueLottos(purchaseAmount) {
    const issueQuantity = this.#lottoMachine.calculateIssueQuantity(purchaseAmount);
    this.#lottos = this.#lottoMachine.issueLottos(issueQuantity);
  }

  #printLottoInfos() {
    const lottoListElement = document.querySelector('.lotto-info__lotto-list');

    document.querySelector('.lotto-info__label').textContent =
      `총 ${this.#lottos.length}개를 구매하였습니다.`;

    lottoListElement.innerHTML = '';

    this.#lottos.forEach((lotto) => {
      const lottoElement = document.createElement('div');

      lottoElement.className = 'lotto-info__lotto';

      const lottoEmojiElement = document.createElement('span');
      lottoEmojiElement.className = 'lotto-info__lotto-emiji text-emoji';
      lottoEmojiElement.textContent = '🎟️';

      const lottoNumbersElement = document.createElement('span');
      lottoNumbersElement.className = 'lotto-info__lotto-numbers text-content';
      lottoNumbersElement.textContent = lotto
        .getNumbers()
        .join(OPTIONS.OUTPUT.lottoNumbersDelimiter);

      lottoElement.appendChild(lottoEmojiElement);
      lottoElement.appendChild(lottoNumbersElement);

      lottoListElement.appendChild(lottoElement);
    });
  }

  #showComponentByClass(className) {
    document.querySelector(className).classList.remove('hidden');
  }
}

export default LottoController2;
