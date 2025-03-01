const purchaseButton = document.querySelector(".lotto-form button"); 
const inputPrice = document.querySelector(".lotto-form input");
const winningButton = document.querySelector(".winning-form button");
const winningNumberInputs = document.querySelectorAll(".winning-input-list input");
const bonusInput = document.querySelector(".bonus-input input");
const statisticsModal = document.querySelector(".statistics-modal");
const modalBackdrop = document.querySelector(".modal-backdrop");
const closeButton = document.querySelector(".close-button")

export const webInputView = {
    purchaseMoney(callback) {
        purchaseButton.addEventListener("click", (event) => {
            event.preventDefault();
    
            callback(inputPrice.value);
        });
    },

    winning(callback) {
        winningButton.addEventListener("click", (event) => {
            event.preventDefault();
            
            const winningNumbers = Array.from(winningNumberInputs).map(input => Number(input.value));
            const bonusNumber = Number(bonusInput.value);
    
            callback(winningNumbers, bonusNumber);
        });
    },
    
    statisticsModal() {
        winningButton.addEventListener("click", () => {
            statisticsModal.style.visibility = 'visible';
            modalBackdrop.style.visibility = 'visible';
        });

        closeButton.addEventListener("click", ()=>{
            statisticsModal.style.visibility = 'hidden';
            modalBackdrop.style.visibility = 'hidden';
        })

        modalBackdrop.addEventListener("click", ()=>{
            statisticsModal.style.visibility = 'hidden';
            modalBackdrop.style.visibility = 'hidden';
        })

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                statisticsModal.style.visibility = 'hidden';
                modalBackdrop.style.visibility = 'hidden';
            }
        });
    },
};
