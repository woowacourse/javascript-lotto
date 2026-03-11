export const webInputReader = {
  inputPurchaseMoney() {
    return new Promise((resolve) => {
      const purchaseInput = document.getElementById('purchaseInput')
      const purchaseButton = document.getElementById('purchaseButton');

      const onClick = () => {
        const inputValue = purchaseInput.value;
        resolve(inputValue);
      }

      purchaseButton.addEventListener('click', onClick);
    })
  }
}