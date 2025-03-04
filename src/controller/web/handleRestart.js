import DomUpdator from "../../utils/DomUpdator.js";
import DomSelector from "../../utils/DomSelectors.js";

const handleRestart = () => {
  const lotto_game = DomSelector.lottoGame;
  const lotto_result_modal = DomSelector.lottoResultModal;
  const purchase_amount_input = DomSelector.purchaseAmountInput;
  const purchase_count = DomSelector.purchaseCount;
  const lotto_pack = DomSelector.lottoPack;

  const winning_numbers = DomSelector.winningNumbers;
  const bonus_number = DomSelector.bonusNumber;

  // ui 로직
  DomUpdator.showModal(lotto_result_modal, false);
  DomUpdator.replaceChildren(lotto_pack);
  DomUpdator.initialInputValue(purchase_amount_input);
  DomUpdator.content(purchase_count, "");
  DomUpdator.addClass(lotto_game, "opacity-0");

  winning_numbers.forEach((element) => {
    DomUpdator.initialInputValue(element);
  });
  DomUpdator.initialInputValue(bonus_number);
};

export default handleRestart;
