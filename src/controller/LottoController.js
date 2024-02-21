import InputView from '../views/InputView';
import Console from '../utils/Console';
import LottoPaymentValidator from '../validators/LottoPaymentValidator';

class LottoController {
  async run() {
    await this.readLottoPayment();
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
}

export default LottoController;
