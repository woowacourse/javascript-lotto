const NumberInput = (name, ariaLabel = "", id = "") => `
  <input 
    type="number" 
    name="${name}" 
    ${id ? `id="${id}"` : ""}
    ${ariaLabel ? `aria-label="${ariaLabel}"` : ""}
    class="number-input"
  />
`;

export const WinningNumberInput = () => `
  <span class="input-label">당첨 번호</span>
  <div class="number-input-wrapper">
    ${Array.from({ length: 6 }, (_, i) =>
      NumberInput("winning-number", `당첨 번호 ${i + 1}번`),
    ).join("")}
  </div>
`;

export const BonusNumberInput = () => `
  <label for="bonus-number" class="input-label">보너스 번호</label>
  <div class="number-input-wrapper">
    ${NumberInput("bonus-number", "보너스 번호", "bonus-number")}
  </div>
`;
