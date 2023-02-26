const $budgetInput = document.querySelector('.budget_input');

const $winningNumberInputs = document.querySelectorAll('.winning_number');
const $bonusNumberInput = document.querySelector('.bonus_number');

const input = {
  getWinningNumberInputsValues() {
    return [...$winningNumberInputs].map((input) => Number(input.value));
  },

  getBonusNumberInputValue() {
    return $bonusNumberInput.value;
  },

  initInputs() {
    [$budgetInput, ...$winningNumberInputs, $bonusNumberInput].forEach(
      (input) => (input.value = '')
    );
  },
};

export default input;
