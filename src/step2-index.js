import Calculator from "./Calculator.js";
import LottoCenter from "./LottoCenter.js";
import { getLottos, getYieldRate } from "./LottoStore.js";
import {
  validatePurchaseAmount,
  validateWinningNumbers,
  validateBonusNumber,
} from "./util/validate.js";

const buyInfo = {
  amount: 0,
  lottos: [],
};

const purchaseForm = document.querySelector(".purchase-form");
const purchaseInput = document.querySelector(".purchase-input");
const userLottoContainer = document.querySelector(".user-lotto-container");
const purchaseButton = document.querySelector(".purchase-button");

const winningInputContainer = document.querySelector(
  ".winning-input-container"
);
const winningModalContainer = document.querySelector(".modal-container");

purchaseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const amount = purchaseInput.value;
    validatePurchaseAmount(amount);
    buyInfo.amount = amount;
    const lottos = getLottos(amount);
    buyInfo.lottos.push(...lottos);

    userLottoContainer.appendChild(createLottoQuantity(amount));
    userLottoContainer.appendChild(createLottoList(lottos));
    winningInputContainer.appendChild(createWinningInputTitle());
    winningInputContainer.appendChild(createWinningInputForm());

    purchaseInput.setAttribute("disabled", "true");
    purchaseButton.classList.add("purchased");

    const firstWinningInput = document.getElementById("winning-number-1");
    firstWinningInput.focus();
  } catch (error) {
    alert(error.message);
  }
});

const createLottoQuantity = (amount) => {
  const quantity = Calculator.getQuantity(amount);
  const lottoQuantity = document.createElement("p");
  lottoQuantity.classList.add("user-lotto-quantity");
  lottoQuantity.textContent = `총 ${quantity}개를 구매했습니다.`;

  return lottoQuantity;
};

const createLottoList = (lottos) => {
  const lottoList = document.createElement("ul");
  lottoList.classList.add("user-lotto-list");

  lottos.forEach((lotto) => {
    lottoList.appendChild(createLottoItem(lotto));
  });

  return lottoList;
};

const createLottoItem = (lotto) => {
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
};

const createWinningInputTitle = () => {
  const winningInputTitle = document.createElement("h4");
  winningInputTitle.classList.add("winning-input-title");
  winningInputTitle.textContent =
    "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.";

  return winningInputTitle;
};

const createWinningInputForm = () => {
  const winningInputForm = document.createElement("form");
  const inputContainer = document.createElement("div");
  inputContainer.classList.add("winning-input-form");

  inputContainer.appendChild(createWinningNumberInput());
  inputContainer.appendChild(createBonusNumberInput());

  winningInputForm.appendChild(inputContainer);
  winningInputForm.appendChild(createWinningInputButton());

  return winningInputForm;
};

const createWinningNumberInput = () => {
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
};

const createBonusNumberInput = () => {
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
};

const createWinningInputButton = () => {
  const winningInputButton = document.createElement("button");
  winningInputButton.classList.add("winning-input-button");
  winningInputButton.textContent = "결과 확인하기";
  winningInputButton.setAttribute("type", "submit");

  return winningInputButton;
};
