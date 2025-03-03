class LottoWebView {
  constructor() {
    this.resultButton = document.querySelector(".result_check_button");
    this.restartButton = document.querySelector(".restart");
    this.closeButton = document.querySelector(".close_button");
    this.modal = document.querySelector(".modal_overlay");
    this.purchaseInput = document.querySelector(".purchase_input");
    this.purchaseButton = document.querySelector(".purchase_button");
    this.resultSection = document.querySelector(".result_section");
    this.winningSection = document.querySelector(".winning_number_section");
  }

  closeModal() {
    this.modal.style.display = "none";
  }

  resetInputs() {
    this.purchaseInput.value = "";
    document.querySelectorAll(".winning_number_input").forEach((input) => (input.value = ""));
    document.querySelector(".bonus_number_input").value = "";
    this.modal.style.display = "none";
    this.resultSection.style.display = "none";
    this.winningSection.style.display = "none";
  }
}

export default LottoWebView;
