import LottoCenter from "./LottoCenter.js";
import create from "./creator.js";
import select from "./selector.js";
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

const purchaseForm = select.purchaseForm;
const purchaseInput = select.purchaseInput;
const userLottoContainer = select.userLottoContainer;
const purchaseButton = select.purchaseButton;
const winningInputContainer = select.winningInputContainer;
const winningModalContainer = select.winningModalContainer;
const winningTableContainer = select.winningTableContainer;
const winningDialog = select.winningDialog;
const closeButton = select.closeButton;
const restartButton = select.restartButton;

purchaseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const amount = purchaseInput.value;
    validatePurchaseAmount(amount);
    buyInfo.amount = amount;
    const lottos = getLottos(amount);
    buyInfo.lottos.push(...lottos);

    userLottoContainer.appendChild(create.lottoQuantity(amount));
    userLottoContainer.appendChild(create.lottoList(lottos));
    winningInputContainer.appendChild(create.winningInputTitle());
    winningInputContainer.appendChild(create.winningInputForm());

    purchaseInput.setAttribute("disabled", "true");
    purchaseButton.classList.add("purchased");

    const firstWinningInput = document.getElementById("winning-number-1");
    firstWinningInput.focus();
  } catch (error) {
    alert(error.message);
  }
});

winningInputContainer.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const winningInfo = {
      winning: getWinningNumbers(),
      bonus: getBonusNumber(),
    };

    validateWinningInputs(winningInfo);
    disableWinningInputs();

    const winningCount = LottoCenter.getWinningCounts(
      buyInfo.lottos,
      winningInfo
    );

    const yieldRate = getYieldRate(winningCount, buyInfo.amount);
    const winningModalContent = create.modalContent(winningCount, yieldRate);
    winningModalContainer.classList.add("winning-result-dialog-background");
    winningTableContainer.innerHTML = winningModalContent;
    winningDialog.open = true;
    document.body.style.overflow = "hidden";

    closeButton.addEventListener("click", closeModal);

    winningModalContainer.addEventListener("click", (e) => {
      if (e.target === winningModalContainer) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    });

    restartButton.addEventListener("click", restartGame);
  } catch (error) {
    alert(error.message);
    const firstWinningInput = document.getElementById("winning-number-1");
    firstWinningInput.focus();
  }
});

const disableWinningInputs = () => {
  document.querySelectorAll(".winning-input").forEach((input) => {
    input.setAttribute("disabled", "true");
  });
};

const getWinningNumbers = () => {
  const winningNumbers = [];

  for (let i = 0; i < 6; i++) {
    const winningNumberInput = document.getElementById(
      `winning-number-${i + 1}`
    );
    winningNumbers.push(winningNumberInput.value);
  }

  return winningNumbers.map(Number);
};

const getBonusNumber = () => {
  const bonusNumberInput = document.getElementById("bonus-number");
  return Number(bonusNumberInput.value);
};

const validateWinningInputs = (winningInfo) => {
  validateWinningNumbers(winningInfo.winning);
  validateBonusNumber(winningInfo.bonus, winningInfo.winning);
};

const closeModal = () => {
  winningTableContainer.innerHTML = "";
  winningDialog.close();
  winningModalContainer.classList.remove("winning-result-dialog-background");
  document.body.style.overflow = "auto";
};

const restartGame = () => {
  buyInfo.amount = 0;
  buyInfo.lottos = [];

  purchaseInput.value = "";
  purchaseButton.classList.remove("purchased");
  purchaseInput.removeAttribute("disabled");

  userLottoContainer.innerHTML = "";
  winningInputContainer.innerHTML = "";
  closeModal();
};
