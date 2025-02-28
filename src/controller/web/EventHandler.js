const purchase_button = document.querySelector("#purchaseButton");
const purchase_amount_input = document.querySelector("#purchaseAmount");
const reuslt_button = document.querySelector(".reuslt_button_section #resultButton");
const lotto_result_modal = document.querySelector(".lotto_result_modal");
const restart_button = document.querySelector("#restartButton");

const EventHandler = {
  purchaseButton: (eventFn) => purchase_button.addEventListener("click", eventFn),
  purchaseAmountInput: (eventFn) => purchase_amount_input.addEventListener("keydown", eventFn),
  reusltButton: (eventFn) => reuslt_button.addEventListener("click", eventFn),
  lottoResultModal: (eventFn) => lotto_result_modal.addEventListener("click", eventFn),
  restartButton: (eventFn) => restart_button.addEventListener("click", eventFn),
};

export default EventHandler;
