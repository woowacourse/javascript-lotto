import Validator from '../../domain/Validator';

export class LottoController {
  purchaseLotto(money) {
    try {
      Validator.purchaseAmount(money);
    } catch (error) {
      alert('error.message');
    }
  }
}
