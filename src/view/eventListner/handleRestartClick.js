import { DOM } from "../../utils/DomSelector.js";
import { cleanInput } from "../utils/cleanInput.js";
import { cleanTextContent } from "../utils/cleanTextContent.js";

export const handleRestartClick = () => {
    cleanInput(DOM.lottoInput)
    cleanInput(DOM.bonusInput)
    cleanTextContent(DOM.purchaseResult)
    DOM.winningInputList.querySelectorAll("input").forEach(input => cleanInput(input));
    DOM.statisticsModal.style.visibility = 'hidden';
    DOM.modalBackdrop.style.visibility = 'hidden';
    DOM.winningForm.style.visibility = "hidden";
    DOM.lottoTicketListContainer.innerHTML = "";
    DOM.purchaseButton.disabled = false;
    DOM.inputPrice.disabled = false;
    DOM.winningNumberInputs.forEach(input => {
        input.disabled = false;
    });
    DOM.bonusInput.disabled = false;
};