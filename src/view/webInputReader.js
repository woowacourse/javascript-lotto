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

  savedBonusNumber: null,

  readWinningNumber() {
    return new Promise((resolve) => {
      const getResultButton = document.getElementById('getResultButton');
      const winningInput = document.querySelectorAll('input.winningInput');
      const bonusInput = document.getElementById('bonusInput');
      
      const onClick = () => {
        this.savedBonusNumber = bonusInput.value;
        const winningNumberArray = Array.from(winningInput).map(item => item.value);
        const winningNumberString = winningNumberArray.join(',');
        resolve(winningNumberString);
      }
      
      getResultButton.addEventListener('click', onClick);
    })
  },

  readBonusNumber() {
    return new Promise((resolve) => {
      resolve(this.savedBonusNumber);
      this.savedBonusNumber = null;
    })
  },

  readRetry() {
    return new Promise((resolve) => {
      const myLotto = document.getElementById("myLotto");
      const winningDiv = document.getElementById("winningDiv");
      const getResultButton = document.getElementById("getResultButton");
      const resultModal = document.getElementById("resultModal");

      const purchaseInput = document.getElementById('purchaseInput').value;
      const winningInput = document.getElementsByClassName('winningInput').value;
      const bonusInput = document.getElementById("bonusInput").value;

      const retryButton = document.getElementById("retryButton");

      const onClick = () => {
        myLotto.style.display = 'none';
        winningDiv.style.display = 'none';
        getResultButton.style.display = 'none';
        resultModal.style.display = 'none';

        document.querySelectorAll("input[type=number]").forEach((item) => {
          item.value = "";
        })

        document.querySelectorAll('.myLottoListLi').forEach((element) => {
          element.remove();
        })

        resolve('y');
      }

      retryButton.addEventListener('click', onClick);
    })
  }
}