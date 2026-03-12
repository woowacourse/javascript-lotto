export const webInputReader = {
  readPurchaseMoney() {
    return new Promise((resolve) => {    
      const purchaseInput = document.getElementById('purchaseInput')
      const purchaseButton = document.getElementById('purchaseButton');

      const onClick = () => {
        resolve(purchaseInput.value);
      }

      purchaseButton.addEventListener('click', onClick);
    })
  },

  readWinningNumber() {
    return new Promise((resolve) => {
      const getResultButton = document.getElementById('getResultButton');
      const winningInput = document.querySelectorAll('input.winningInput');
      
      const onClick = () => {
        const winningNumberArray = Array.from(winningInput).map(item => item.value);
        const winningNumberString = winningNumberArray.join(',');
        resolve(winningNumberString);
      }
      
      getResultButton.addEventListener('click', onClick);
    })
  },

  readBonusNumber() {
    return new Promise((resolve) => {
      const getResultButton = document.getElementById('getResultButton');
      const bonusInput = document.getElementById('bonusInput');

      const onClick = () => {
        resolve(bonusInput.value);
      }

      getResultButton.addEventListener('click', onClick);
    })
  },

  readRetry() {
    return new Promise((resolve) => {
      return;
    })
  }
}