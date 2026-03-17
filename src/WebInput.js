
import { InputValidator } from "./utils/validator.js";

export default class WebInput {
    getPurchaseAmount() {
        const purchaseInput = document.getElementById("purchaseinput");
        const purchaseAmount = purchaseInput ? purchaseInput.value.trim() : "";

        InputValidator.validatePurchaseAmount(purchaseAmount);

        return Number(purchaseAmount);
    }

    getWinningNumbers() {
        const inputs = Array.from(document.querySelectorAll(".winning-numbers .number-input"));
        const values = inputs.map((input) => input.value.trim());

        const inputString = values.join(",");
        InputValidator.validateWinningNumbers(inputString);

        return values.map((value) => Number(value));
    }

    getBonusNumber(winningNumbers) {
        const bonusInput = document.querySelector(".bonus-number .number-input");
        const bonusValue = bonusInput ? bonusInput.value.trim() : "";

        InputValidator.validateBonusNumber(bonusValue, winningNumbers);

        return Number(bonusValue);
    }
}
