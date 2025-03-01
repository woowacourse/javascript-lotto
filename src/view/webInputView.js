const purchaseButton = document.querySelector(".lotto-form button"); 
const inputPrice = document.querySelector(".lotto-form input");
const winningButton = document.querySelector(".winning-form button");
const winningNumberInputs = document.querySelectorAll(".winning-input-list input");
const bonusInput = document.querySelector(".bonus-input input");


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
    }    
};