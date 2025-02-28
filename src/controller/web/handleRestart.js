import DomSelector from "../../utils/domSelector";

const handleRestart = () => {
  const lotto_result_modal = DomSelector.lottoResultModal;
  const purchase_amount = DomSelector.purchaseAmount;
  const purchase_count = DomSelector.purchaseCount;
  const lotto_pack = DomSelector.lottoPack;
  const answer_lotto_section = DomSelector.answerLottoSection;
  const reuslt_button = DomSelector.reusltButton;

  const winning_numbers = DomSelector.winningNumbers;
  const bonus_number = DomSelector.bonusNumber;

  // ui 로직
  lotto_result_modal.close();
  lotto_pack.replaceChildren();
  purchase_amount.value = "";
  purchase_count.textContent = "";
  answer_lotto_section.classList.add("opacity-0");
  reuslt_button.classList.add("opacity-0");

  winning_numbers.forEach((element) => {
    element.value = "";
  });
  bonus_number.value = "";
};

export default handleRestart;
