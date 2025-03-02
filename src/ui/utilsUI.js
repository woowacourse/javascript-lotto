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

export const removeUI = {
  removeInputValue(input) {
    input.value = "";
  },

  removeGeneratedLottosLists() {
    while (elements.generatedLottosLists.firstChild) {
      elements.generatedLottosLists.removeChild(
        elements.generatedLottosLists.firstChild
      );
    }
  },

  removePrizeResultCountElements() {
    elements.trs.forEach((tr) => {
      tr.lastChild.remove();
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
      removeUI.removeInputValue(elements.purchaseInput);
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
        removeUI.removeInputValue(input);
      });
      initWinningNumbers(winningNumbers);
      return false;
    }
  },

  isValidBonusNumber(winningNumbers, bonusNumber) {
    try {
      validateBonusNumberUnique(winningNumbers, bonusNumber);
      return true;
    } catch (error) {
      alert(error.message);
      removeUI.removeInputValue(elements.bonusNumberInput);
      initWinningNumbers(winningNumbers);
      return false;
    }
  },
};

export const displayUI = {
  displayBlock(element) {
    element.style.display = "block";
  },

  displayNone(element) {
    element.style.display = "none";
  },
};

export function initWinningNumbers(winningNumbers) {
  winningNumbers = [];
}
