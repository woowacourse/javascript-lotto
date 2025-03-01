const purchaseButton = document.querySelector(".lotto-form button"); 
const inputPrice = document.querySelector(".lotto-form input"); 

export const webInputView = {
    purchaseMoney(callback) {
        purchaseButton.addEventListener("click", (event) => {
            event.preventDefault();
    
            callback(inputPrice.value);
        });
    }
};