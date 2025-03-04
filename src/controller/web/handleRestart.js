import DomUpdator from "../../utils/DomUpdator.js";
import DomSelector from "../../utils/DomSelectors.js";

const handleRestart = () => {
  const lotto_game = DomSelector.lottoGame;
  const lotto_result_modal = DomSelector.lottoResultModal;
  const purchase_amount = DomSelector.purchaseAmount;
  const purchase_count = DomSelector.purchaseCount;
  const lotto_pack = DomSelector.lottoPack;
  const answer_lotto = DomSelector.answerLotto;

  // ui 로직
  DomUpdator.showModal(lotto_result_modal, false);
  DomUpdator.replaceChildren(lotto_pack);
  DomUpdator.content(purchase_count, "");
  DomUpdator.addClass(lotto_game, "opacity-0");
  purchase_amount.reset();
  answer_lotto.reset();
};

export default handleRestart;
