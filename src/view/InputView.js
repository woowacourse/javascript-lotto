import INPUT_MESSAGE from "../constant/input.js";

const InputView = {
  async readPurchaseAmount() {
    return document.getElementById("input-purchase-amount").value;
  },

  async readWinningNumbers() {
    // 사용자가 입력한 당첨 번호들을 가져와서 ,로 묶어서 return
    const inputs = Array.from(document.querySelectorAll(".lotto-input"));
    const winningNumbers = inputs.slice(0, -1).map((input) => input.value);

    return winningNumbers.join(",");
  },

  async readBonusNumber() {
    const inputs = Array.from(document.querySelectorAll(".lotto-input"));
    const bonusNumber = inputs.at(-1).value;

    return bonusNumber;
  },

  async readRestart() {
  },
};

export default InputView;
