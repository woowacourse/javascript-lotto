const NumberInput = (name) => `
  <input 
    type="number" 
    name="${name}" 
    class="number"
  />
`;

export const WinningNumberInput = () => `
  <div class="winning-numbers-container">
    <label>당첨 번호</label>
    <div class="winning-number-wrapper">
      ${Array.from({ length: 6 }, (_, i) => NumberInput("winning-number")).join(
        "",
      )}
    </div>
  </div>
`;

export const BonusNumberInput = () => `
  <div class="bonus-number-container">
    <label for="bonus-number">보너스 번호</label>
    ${NumberInput("bonus-number")}
  </div>
`;
