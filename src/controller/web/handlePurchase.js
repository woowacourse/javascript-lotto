import LottoMachine from "../../domain/LottoMachine/LottoMachine.js";
import parseAndValidatePurchaseAmount from "../../domain/processors/parseAndValidatePurchaseAmount.js";
import DomUpdator from "../../utils/DomUpdator.js";
import DomSelector from "../../utils/domSelector.js";
import WebView from "../../view/WebView.js";

const handlePurchase = () => {
  // DOM 선택
  const lotto_game = DomSelector.lottoGame;
  const purchase_amount = DomSelector.purchaseAmount;
  const purchase_count = DomSelector.purchaseCount;
  const lotto_pack = DomSelector.lottoPack;
  const error_modal = DomSelector.errorModal;

  try {
    // 도메인 로직
    const purchaseAmount = parseAndValidatePurchaseAmount(purchase_amount.value);
    const lottoPack = LottoMachine(purchaseAmount);

    // ui 로직
    WebView.updatePurchaseCount(purchase_count, lottoPack.count);
    WebView.updateLottoPack(lotto_pack, lottoPack.lottos);
    DomUpdator.removeClass(lotto_game, "opacity-0");
    DomUpdator.blur(purchase_amount);

    return { purchaseAmount, lottoPack };
  } catch (error) {
    DomUpdator.initialInputValue(purchase_amount);
    DomUpdator.content(error_modal, error);
    DomUpdator.showModal(error_modal, true);
  }
};

export default handlePurchase;
