const handleRestart = () => {
  const lotto_result_modal = document.querySelector(".lotto_result_modal");
  const purchase_amount_input = document.querySelector("#purchaseAmount");
  const purchase_count = document.querySelector(".purchase_count");
  const lotto_pack = document.querySelector(".lotto_pack");
  const answer_lotto_section = document.querySelector(".answer_lotto_section");
  const reuslt_button = document.querySelector(".reuslt_button_section #resultButton");

  lotto_result_modal.close();
  purchase_amount_input.value = "";
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
