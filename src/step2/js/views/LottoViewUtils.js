import { LOTTO_MAX_NUMBER } from "../../../constants/config.js";

export function createTicketsHTML(tickets) {
  return tickets
    .map(
      (ticket) => `
      <div class="lotto-result-line">
        <div class="lotto-ticket-img">🎟️</div>
        <div class="generated-lotto-num">${ticket.join(", ")}</div>
      </div>
    `,
    )
    .join("");
}

export function findRankCount(resultData, matchCount, requireBonus = false) {
  const rank = resultData.find((data) => data.matchCount === matchCount && data.requireBonus === requireBonus);
  return rank?.count ?? 0;
}

export function getWinningFocusTarget(winningInputs) {
  const inputs = Array.from(winningInputs);
  const firstEmptyInput = inputs.find((input) => input.value === "");

  return firstEmptyInput ?? inputs[inputs.length - 1] ?? inputs[0];
}

export function getWinningFormValues(winningNumberInputs, bonusInput) {
  const winningNumbers = Array.from(winningNumberInputs, (input) => input.value);
  const bonusNumber = bonusInput.value;

  return { winningNumbers, bonusNumber };
}

// 정규식 사용하여 2자리 숫자만 입력할 수 있게 만든 함수
export function normalizeWinningInputValue(value) {
  const digitsOnly = value.replace(/\D/g, "").slice(0, 2);

  if (digitsOnly === "") {
    return "";
  }

  const parsedValue = Number(digitsOnly);

  if (parsedValue === 0) {
    return "";
  }

  return parsedValue > LOTTO_MAX_NUMBER ? String(LOTTO_MAX_NUMBER) : String(parsedValue);
}
