import LottoMachine from './domain/LottoMachine';

class LottoMeditator {
  #lottoMachine;

  receivePaymentsInput(payments) {
    this.#lottoMachine = new LottoMachine(payments);
  }

  receiveWinningLottoNumbersInput(winningNumbers) {
    this.#lottoMachine.generateWinningLotto(winningNumbers);
  }

  receiveBonusNumberInput(bonusNumber) {
    this.#lottoMachine.setBonusNumber(bonusNumber);
  }

  sendLottoNumbers() {
    return this.#lottoMachine.getLottoNumbers();
  }

  sendStatstics() {
    return this.#lottoMachine.calcStatstics();
  }
}

export default LottoMeditator;
