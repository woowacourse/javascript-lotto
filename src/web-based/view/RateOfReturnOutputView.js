class RateOfReturnOutputView {
  rateOfReturnView = document.querySelector('.wrapper-rateOfReturn');

  displayRateOfReturn(rateOfReturn) {
    this.rateOfReturnView.textContent = '';
    this.rateOfReturnView.innerHTML += `
    <p class='text-rate-of-return'>당신의 총 수익률은 ${rateOfReturn}%입니다.</p>
    `;
    this.rateOfReturnView.classList.remove('invisible');
  }

  resetToInitialState() {
    this.rateOfReturnView.textContent = '';
    this.rateOfReturnView.classList.add('invisible');
  }
}

export default new RateOfReturnOutputView();
