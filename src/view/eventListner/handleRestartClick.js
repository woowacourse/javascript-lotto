import { DOM } from "../../constants/constants.js";

export const handleRestartClick = () => {
    DOM.lottoInput.value = "";
    DOM.winningInputList.querySelectorAll("input").forEach(input => input.value = "");
    DOM.bonusInput.value = "";
    DOM.statisticsModal.style.visibility = 'hidden';
    DOM.modalBackdrop.style.visibility = 'hidden';
    DOM.winningForm.style.visibility = "hidden";
    DOM.purchaseResult.textContent = "";
    DOM.lottoTicketListContainer.innerHTML = "";
    DOM.purchaseButton.disabled = false;
    DOM.inputPrice.disabled = false;
    DOM.winningNumberInputs.forEach(input => {
        input.disabled = false;
    });
    DOM.bonusInput.disabled = false;
};