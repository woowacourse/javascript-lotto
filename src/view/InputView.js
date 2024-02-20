import MESSAGE from '../constants/message';
import Console from '../util/Console';

const InputView = {
  async askPurchaseAmount() {
    const purchaseAmount = await Console.readLineAsync(
      MESSAGE.QUERY.PURCHASE_AMOUNT
    );
    return purchaseAmount;
  },
};

export default InputView;
