import OPTIONS from '../constant/Options.js';
import LottoMachine from '../domain/LottoMachine.js';
import WinningLotto from '../domain/WinningLotto.js';

class LottoController2 {
  #lottoMachine = new LottoMachine();

  #lottos;

  issueLottosAndPrintInfos(purchaseAmount) {
    this.#issueLottos(purchaseAmount);

    this.#printLottoInfos();

    this.#showComponentById('con-lotto-infos');
    this.#showComponentById('form-winnings');
  }

  #issueLottos(purchaseAmount) {
    const issueQuantity = this.#lottoMachine.calculateIssueQuantity(purchaseAmount);
    this.#lottos = this.#lottoMachine.issueLottos(issueQuantity);
  }

  #printLottoInfos() {
    const lottoNumbersContainer = document.querySelector('.con-lotto-numbers');

    document.getElementById('span-issued-quntity').textContent = this.#lottos.length;

    lottoNumbersContainer.innerHTML = '';

    this.#lottos.forEach((lotto) => {
      const lottoElement = document.createElement('p');

      const lottoEmojiElement = document.createTextNode('🎟️');

      const lottoNumbersElement = document.createElement('span');
      lottoNumbersElement.className = 'span-lotto-numbers';
      lottoNumbersElement.textContent = lotto
        .getNumbers()
        .join(OPTIONS.OUTPUT.lottoNumbersDelimiter);

      lottoElement.appendChild(lottoEmojiElement);
      lottoElement.appendChild(lottoNumbersElement);

      lottoNumbersContainer.appendChild(lottoElement);
    });
  }

  analyzeAndPrintLottoResult(winningNumbers, bonusNumber) {
    const [winningResult, profitRate] = this.#analzeLottoResults(winningNumbers, bonusNumber);

    this.#printWinningResult(winningResult);
    this.#printProfitRate(profitRate);

    this.#showComponentById('con-modal');
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
    document.querySelectorAll('.span-winning-count').forEach((shell, index) => {
      shell.innerHTML = winningResult[5 - index];
    });
  }

  #printProfitRate(profitRate) {
    document.querySelector('.span-profit-rate').innerHTML =
      `당신의 총 수익률은 ${profitRate.toFixed(1)}% 입니다.`;
  }

  #showComponentById(Id) {
    document.getElementById(Id).classList.remove('hidden');
  }
}

export default LottoController2;
