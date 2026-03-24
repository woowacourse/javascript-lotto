import { validateNotEmptyString, validateStringIsNumber } from '../Validator';

const WinningForm = {
  getWinningNumbers() {
      const inputs = document.querySelectorAll(".winning-number");
      const numbers = Array.from(inputs).map((input) => {
        validateNotEmptyString(input.value);
        validateStringIsNumber(input.value);
        return Number(input.value);
      });
  
      return numbers;
    },

  getBonusNumber() {
      const input = document.getElementById("bonus-number").value;
      validateNotEmptyString(input);
      validateStringIsNumber(input);
  
      return Number(input);
    },

  show() {
    document.getElementById("winning-section").classList.remove("hidden");
  },

  hide() {
    document.getElementById("winning-section").classList.add("hidden");
  },

  // Output: 자기 영역 초기화
  reset() {
    document.querySelectorAll(".winning-number").forEach((input) => {
      input.value = "";
    });
    document.getElementById("bonus-number").value = "";
    this.hide();
  },

  bindResultClick(handler) {
    document.getElementById("result-btn").addEventListener("click", handler);
  },
};

export default WinningForm;