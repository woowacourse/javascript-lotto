import Calculator from "./Calculator.js";

const create = {
  lottoQuantity: (amount) => {
    const quantity = Calculator.getQuantity(amount);
    const lottoQuantity = document.createElement("p");
    lottoQuantity.classList.add("user-lotto-quantity");
    lottoQuantity.textContent = `총 ${quantity}개를 구매했습니다.`;

    return lottoQuantity;
  },

  lottoList: (lottos) => {
    const lottoList = document.createElement("ul");
    lottoList.classList.add("user-lotto-list");

    lottos.forEach((lotto) => {
      lottoList.appendChild(create.lottoItem(lotto));
    });

    return lottoList;
  },

  lottoItem: (lotto) => {
    const lottoItem = document.createElement("li");
    lottoItem.classList.add("user-lotto-item");

    const lottoIcon = document.createElement("span");
    lottoIcon.classList.add("user-lotto-icon");
    lottoIcon.textContent = "🎟️";

    const lottoNumbers = document.createElement("span");
    lottoNumbers.classList.add("user-lotto-numbers");
    lottoNumbers.textContent = lotto.join(", ");

    lottoItem.appendChild(lottoIcon);
    lottoItem.appendChild(lottoNumbers);

    return lottoItem;
  },

  winningInputTitle: () => {
    const winningInputTitle = document.createElement("h4");
    winningInputTitle.classList.add("winning-input-title");
    winningInputTitle.textContent =
      "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.";

    return winningInputTitle;
  },

  winningInputForm: () => {
    const winningInputForm = document.createElement("form");
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("winning-input-box");

    inputContainer.appendChild(create.winningNumberInput());
    inputContainer.appendChild(create.bonusNumberInput());

    winningInputForm.appendChild(inputContainer);
    winningInputForm.appendChild(create.winningInputButton());

    return winningInputForm;
  },

  winningNumberInput: () => {
    const winningNumberInputContainer = document.createElement("div");
    winningNumberInputContainer.classList.add("winning-input-item");

    const winningNumberInputLabel = document.createElement("label");
    winningNumberInputLabel.classList.add("winning-input-label");
    winningNumberInputLabel.textContent = "당첨 번호";
    winningNumberInputContainer.appendChild(winningNumberInputLabel);

    for (let i = 0; i < 6; i++) {
      const winningNumberInput = document.createElement("input");
      winningNumberInput.classList.add("winning-input");
      winningNumberInput.setAttribute("id", `winning-number-${i + 1}`);
      winningNumberInput.setAttribute("type", "number");
      winningNumberInput.setAttribute("min", "1");
      winningNumberInput.setAttribute("max", "45");
      winningNumberInput.setAttribute("required", "true");

      winningNumberInputContainer.appendChild(winningNumberInput);
    }

    return winningNumberInputContainer;
  },

  bonusNumberInput: () => {
    const bonusNumberInputContainer = document.createElement("div");
    bonusNumberInputContainer.classList.add("winning-input-item");

    const bonusNumberInputLabel = document.createElement("label");
    bonusNumberInputLabel.classList.add("winning-input-label");
    bonusNumberInputLabel.textContent = "보너스 번호";
    bonusNumberInputContainer.appendChild(bonusNumberInputLabel);

    const bonusNumberInputInput = document.createElement("input");
    bonusNumberInputInput.classList.add("winning-input");
    bonusNumberInputInput.classList.add("bonus-input");
    bonusNumberInputInput.setAttribute("id", "bonus-number");
    bonusNumberInputInput.setAttribute("type", "number");
    bonusNumberInputInput.setAttribute("min", "1");
    bonusNumberInputInput.setAttribute("max", "45");
    bonusNumberInputInput.setAttribute("required", "true");

    bonusNumberInputContainer.appendChild(bonusNumberInputInput);

    return bonusNumberInputContainer;
  },

  winningInputButton: () => {
    const winningInputButton = document.createElement("button");
    winningInputButton.classList.add("winning-input-button");
    winningInputButton.textContent = "결과 확인하기";
    winningInputButton.setAttribute("type", "submit");

    return winningInputButton;
  },

  modalContent: (winningCount, yieldRate) => {
    return `
    <div class="winning-result-table">
              <p class="winning-result-table-title">일치 갯수</p>
              <p class="winning-result-table-title">당첨금</p>
              <p class="winning-result-table-title">당첨 갯수</p>
            </div>
            <div class="winning-result-table">
              <p class="winning-result-table-item">3개</p>
              <p class="winning-result-table-item">5,000</p>
              <p class="winning-result-table-item">${winningCount["5등"]}개</p>
            </div>
            <div class="winning-result-table">
              <p class="winning-result-table-item">4개</p>
              <p class="winning-result-table-item">50,000</p>
              <p class="winning-result-table-item">${winningCount["4등"]}개</p>
            </div>
            <div class="winning-result-table">
              <p class="winning-result-table-item">5개</p>
              <p class="winning-result-table-item">1,500,000</p>
              <p class="winning-result-table-item">${winningCount["3등"]}개</p>
            </div>
            <div class="winning-result-table">
              <p class="winning-result-table-item">5개 + 보너스볼</p>
              <p class="winning-result-table-item">30,000,000</p>
              <p class="winning-result-table-item">${winningCount["2등"]}개</p>
            </div>
            <div class="winning-result-table">
              <p class="winning-result-table-item">6개</p>
              <p class="winning-result-table-item">2,000,000,000</p>
              <p class="winning-result-table-item">${winningCount["1등"]}개</p>
            </div>
          </div>
          <p class="winning-result-total-rate">당신의 총 수익률은 ${yieldRate.toFixed(
            1
          )}%입니다.</p>
          `;
  },
};

export default create;
