import InputView from '../views/InputView';
import Console from '../utils/Console';
import LottoPaymentValidator from '../validators/LottoPaymentValidator';
import LottoValidator from '../validators/LottoValidator';

class LottoController {
  #winningNumbers;
  async run() {
    await this.readLottoPayment();
    this.#winningNumbers = await this.readWinningNumbers();
    await this.readBonusNumber();
    //보너스 번호 받기
    //당첨 통계 출력
    //수익률 출력
  }

  async readLottoPayment() {
    try {
      const lottoPayment = await InputView.lottoPayment();
      LottoPaymentValidator.validate(lottoPayment);
      return lottoPayment;
    } catch (error) {
      Console.print(error.message);
      return this.readLottoPayment();
    }
  }

  async readWinningNumbers() {
    try {
      const winningNumbers = this.splitInput(await InputView.winningNumbers());
      LottoValidator.winningNumbersValidate(winningNumbers);
      return winningNumbers;
    } catch (error) {
      Console.print(error.message);
      return this.readWinningNumbers();
    }
  }

  async readBonusNumber() {
    try {
      const bonusNumber = await InputView.bonusNumber();
      LottoValidator.bonusNumberValidate(this.#winningNumbers, bonusNumber);
      return bonusNumber;
    } catch (error) {
      Console.print(error.message);
      return await this.readBonusNumber();
    }
  }

  splitInput(winningNumbers) {
    return winningNumbers.split(',').map((number) => Number(number));
  }
}

export default LottoController;
