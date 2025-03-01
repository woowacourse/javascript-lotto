import { DOM } from "../constants/constants.js";

export const webInputView = {
    purchaseMoney(callback) {
        DOM.purchaseButton.addEventListener("click", (event) => {
            event.preventDefault();
    
            callback(DOM.inputPrice.value);
        });
    },

    winning(callback) {
        DOM.winningButton.addEventListener("click", (event) => {
            event.preventDefault();
            
            const winningNumbers = Array.from(DOM.winningNumberInputs).map(input => Number(input.value));
            const bonusNumber = Number(DOM.bonusInput.value);
    
            callback(winningNumbers, bonusNumber);
        });
    },
    
    statisticsModal() {
        DOM.winningButton.addEventListener("click", () => {
            DOM.statisticsModal.style.visibility = 'visible';
            DOM.modalBackdrop.style.visibility = 'visible';
        });

        DOM.closeButton.addEventListener("click", ()=>{
            DOM.statisticsModal.style.visibility = 'hidden';
            DOM.modalBackdrop.style.visibility = 'hidden';
        })

        DOM.modalBackdrop.addEventListener("click", ()=>{
            DOM.statisticsModal.style.visibility = 'hidden';
            DOM.modalBackdrop.style.visibility = 'hidden';
        })

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                DOM.statisticsModal.style.visibility = 'hidden';
                DOM.modalBackdrop.style.visibility = 'hidden';
            }
        });
    },
};
