const InputView = {
  getPurchasePrice() {
    return document.querySelector("#inputPrice").value;
  },

  getWinningNumbers() {
    return [
      document.getElementById("winning-number-input-1").value,
      document.getElementById("winning-number-input-2").value,
      document.getElementById("winning-number-input-3").value,
      document.getElementById("winning-number-input-4").value,
      document.getElementById("winning-number-input-5").value,
      document.getElementById("winning-number-input-6").value,
    ];
  },

  getBonusNumber() {
    return document.getElementById("bonus-number-input").value;
  },

  clearPurchasePrice() {
    document.querySelector("#inputPrice").value = "";
  },

  clearWinningNumbers() {
    const inputs = document.querySelectorAll(".winning-number-input");
    inputs.forEach((input) => (input.value = ""));
    document.getElementById("bonus-number-input").value = "";
  },

  focusPurchasePrice() {
    document.querySelector("#inputPrice").focus();
  },

  focusFirstWinningNumber() {
    document.getElementById("winning-number-input-1").focus();
  },
};

export default InputView;
