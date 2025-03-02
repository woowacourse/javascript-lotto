import { PURCHASE } from "../config/const.js";
import { validateBonusNumberUnique } from "../utils/validate/validate.js";
import { validatePrice } from "../utils/validate/validatePrice.js";
import { validateWinningNumbers } from "../utils/validate/validateWinningNumbers.js";
import { elements } from "./querySelector.js";

export const updateUI = {
  updatePurchaseMessage(price) {
    elements.lottoCountSpan.textContent = `총 ${Number(
      price / PURCHASE.UNIT
    )}개를 구매하였습니다.`;
  },

  updatePrizeResult(lottoPrize) {
    for (const key in lottoPrize.prizeResult) {
      const div = document.querySelector(`#${key}`);
      const span = document.createElement("td");
      span.textContent = lottoPrize.prizeResult[key] + "개";
      div.appendChild(span);
    }
  },

  updateROI(ROI) {
    elements.ROISpan.textContent = `당신의 총 수입률은 총 ${ROI}%입니다.`;
  },
};

export const showUI = {
  showGeneratedLottos(generatedLottos) {
    generatedLottos.forEach((lotto) => {
      const li = document.createElement("li");
      li.textContent = `🎟️ ${lotto.join(", ")}`;
      elements.generatedLottosLists.appendChild(li);
    });
  },
};

export const validUI = {
  isValidPrice(price) {
    try {
      validatePrice(price);
      return true;
    } catch (error) {
      alert(error.message);
      removeInputValue(elements.purchaseInput);
      return false;
    }
  },

  isValidWinningNumbers(winningNumbers) {
    try {
      validateWinningNumbers(winningNumbers);
      return true;
    } catch (error) {
      alert(error.message);
      elements.winningNumberInputs.forEach((input) => {
        removeInputValue(input);
      });
      winningNumbers = [];
      return false;
    }
  },

  isValidBonusNumber(winningNumbers, bonusNumber) {
    try {
      validateBonusNumberUnique(winningNumbers, bonusNumber);
      return true;
    } catch (error) {
      alert(error.message);
      removeInputValue(elements.bonusNumberInput);
      winningNumbers = [];
      return false;
    }
  },
};

export function removeInputValue(input) {
  input.value = "";
}

export function displayBlock(element) {
  element.style.display = "block";
}

export function displayNone(element) {
  element.style.display = "none";
}
