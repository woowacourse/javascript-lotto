const NumberInput = (name, ariaLabel = "", id = "") => `
  <input 
    type="number" 
    name="${name}" 
    ${id ? `id="${id}"` : ""}
    ${ariaLabel ? `aria-label="${ariaLabel}"` : ""}
    class="number"
  />
`;

export const WinningNumberInput = () => `
  <div class="winning-numbers-container">
    <span class="input-label">당첨 번호</span>
    <div class="winning-number-wrapper">
      ${Array.from({ length: 6 }, (_, i) =>
        NumberInput("winning-number", `당첨 번호 ${i + 1}번`),
      ).join("")}
    </div>
  </div>
`;

export const BonusNumberInput = () => `
  <div class="bonus-number-container">
    <label for="bonus-number" class="input-label">보너스 번호</label>
    ${NumberInput("bonus-number", "보너스 번호", "bonus-number")}
  </div>
`;
