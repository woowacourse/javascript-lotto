import OPTIONS from '../constant/Options.js';
import LottoMachine from '../domain/LottoMachine.js';
import WinningLotto from '../domain/WinningLotto.js';

class LottoController2 {
  #lottoMachine = new LottoMachine();

  #lottos;

  issueLottosAndPrintInfos(purchaseAmount) {
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

  analyzeAndPrintLottoResult(winningNumbers, bonusNumber) {
    const [winningResult, profitRate] = this.#analzeLottoResults(winningNumbers, bonusNumber);

    this.#printWinningResult(winningResult);
    this.#printProfitRate(profitRate);

    this.#showComponentByClass('.result-modal');
  }

  #analzeLottoResults(winningNumbers, bonusNumber) {
    const winningResult = this.#lottoMachine.determineLottoRanks(
      this.#lottos,
      new WinningLotto(winningNumbers, bonusNumber)
    );
    const profitRate = this.#lottoMachine.calculateProfitRate(winningResult);

    return [winningResult, profitRate];
  }

  #printWinningResult(winningResult) {
    document.querySelectorAll('.result-modal__winning_count').forEach((shell, index) => {
      shell.innerHTML = winningResult[5 - index];
    });
  }

  #printProfitRate(profitRate) {
    document.querySelector('.result-modal__text-profit-rate').innerHTML =
      `당신의 총 수익률은 ${profitRate.toFixed(1)}% 입니다.`;
  }

  #showComponentByClass(className) {
    document.querySelector(className).classList.remove('hidden');
  }
}

export default LottoController2;
