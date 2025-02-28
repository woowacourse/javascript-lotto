import DomSelector from "../../utils/domSelector";

const handleRestart = () => {
  const lotto_result_modal = DomSelector.lottoResultModal;

  const purchase_amount = DomSelector.purchaseAmount;
  const purchase_count = DomSelector.purchaseCount;
  const lotto_pack = DomSelector.lottoPack;
  const answer_lotto_section = DomSelector.answerLottoSection;
  const reuslt_button = DomSelector.reusltButton;

  lotto_result_modal.close();
  purchase_amount.value = "";
  purchase_count.textContent = "";
  lotto_pack.replaceChildren();

  answer_lotto_section.classList.add("opacity-0");
  reuslt_button.classList.add("opacity-0");

  const winning_numbers = document.querySelectorAll(".winning_number");
  const bonus_number = document.querySelector(".bonus_number");

  winning_numbers.forEach((element) => {
    element.value = "";
  });
  bonus_number.value = "";
};

export default handleRestart;
