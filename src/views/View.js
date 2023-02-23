import RANK from '../constants/rank.js';

class View {
  buyButton;
  showResultButton;
  buyMoneyInput;
  luckyNumbersInput;
  bonusNumberInput;

  constructor() {
    this.registerButtons();
    this.registerInputs();
    this.hideElementsforInitialScreen();
  }

  registerButtons() {
    this.buyButton = document.querySelector('#buy-button');
    this.showResultButton = document.querySelector('#show-result-button');
    this.modalCloseButton = document.querySelector('#modal-close-button');
  }

  registerInputs() {
    this.buyMoneyInput = document.querySelector('#buy-money');
    this.luckyNumbersInput = document.querySelectorAll('#lucky-numbers-input > input');
    this.bonusNumberInput = document.querySelector('#bonus-number');
  }

  hideElementsforInitialScreen() {
    const lottoDetail = document.querySelector('.lotto-detail');
    const winningNumbersForm = document.querySelector('.winning-numbers-form');

    this.hide(lottoDetail);
    this.hide(winningNumbersForm);
  }

  printPurchasedLottos(lottoNumbersList) {
    this.lottosQuantity = document.querySelector('#lottos-quantity');
    this.lottosQuantity.innerText = lottoNumbersList.length;

    this.buyButton.disabled = true;

    const lottoListContainer = document.querySelector('#lotto-list-container');
    lottoNumbersList.forEach(lottoNumbers => {
      lottoListContainer.innerHTML += `
      <li>🎟️ ${lottoNumbers.join(', ')}</li>
      `;
    });

    this.showElementsAfterBuyLottos();
  }

  showElementsAfterBuyLottos() {
    const lottoDetail = document.querySelector('.lotto-detail');
    const winningNumbersForm = document.querySelector('.winning-numbers-form');

    this.show(lottoDetail);
    this.show(winningNumbersForm);
  }

  printResult(amountOfRanks, profit) {
    const amountOfRanksContainer = document.querySelectorAll('.amount-of-ranks-container');
    const profitContainer = document.querySelector('#profit-container');
    const lottoModal = document.querySelector('#lotto-modal');

    amountOfRanksContainer[RANK.SIZE - RANK.FIFTH - 1].innerHTML = amountOfRanks[RANK.FIFTH];
    amountOfRanksContainer[RANK.SIZE - RANK.FOURTH - 1].innerHTML = amountOfRanks[RANK.FOURTH];
    amountOfRanksContainer[RANK.SIZE - RANK.THIRD - 1].innerHTML = amountOfRanks[RANK.THIRD];
    amountOfRanksContainer[RANK.SIZE - RANK.SECOND - 1].innerHTML = amountOfRanks[RANK.SECOND];
    amountOfRanksContainer[RANK.SIZE - RANK.FIRST - 1].innerHTML = amountOfRanks[RANK.FIRST];
    profitContainer.innerHTML = profit;
    const modalBackground = document.querySelector('.modal-background');
    this.show(modalBackground);
    this.show(lottoModal);
  }

  hideModal() {
    const lottoModal = document.querySelector('#lotto-modal');
    const modalBackground = document.querySelector('.modal-background');

    this.hide(lottoModal);
    this.hide(modalBackground);
  }

  show(HTMLelement) {
    HTMLelement.style.display = 'block';
  }

  hide(HTMLelement) {
    HTMLelement.style.display = 'none';
  }
}

export default View;
