import { LOTTO_RULE } from "../../../../constants/lotto.js";

const createNumbersInput = () => {
  const div = document.createElement("div");
  div.id = "winningLotto-winningNumbers-container";

  Array.from({ length: LOTTO_RULE.LOTTO_LENGTH }).forEach((_, index) => {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "winningLotto-number winningLotto-winningNumbers";
    input.id = `winningLotto-winningNumber-${index}`;

    div.appendChild(input);
  });

  document
    .getElementById("winningLotto-winningNumbersInput-container")
    .appendChild(div);
};

export default createNumbersInput;
