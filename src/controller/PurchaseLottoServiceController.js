import MESSAGE from '../constant/Message';
import PurchaseLottoService from '../domain/service/PurchaseLottoService';
import InputView from '../view/InputView';
import OutputView from '../view/OutputView';

class PurchaseLottoServiceController {
  static async playPurchaseLottoService() {
    const purchaseLottoConfig = {
      message: MESSAGE.prompt.purchaseMoney,
      factory: inputString => new PurchaseLottoService(inputString),
    };

    const purchaseLottoService = await InputView.readExactValue(
      purchaseLottoConfig,
    );

    const purchaseCount = purchaseLottoService.getPurchaseCount();
    OutputView.print(MESSAGE.purchaseCount(purchaseCount));

    const lottosNumbers = purchaseLottoService.getLottos();
    lottosNumbers.forEach(lotto => OutputView.print(MESSAGE.lotto(lotto)));

    OutputView.print(MESSAGE.blank);

    const pusrchaseLottoObject = {
      purchaseCountKey: purchaseCount,
      lottosNumbersKey: lottosNumbers,
    };

    return pusrchaseLottoObject;
  }
}

export default PurchaseLottoServiceController;
