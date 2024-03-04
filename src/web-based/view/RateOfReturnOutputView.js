class RateOfReturnOutputView {
  rateOfReturnView = document.querySelector('.wrapper-rateOfReturn');

  displayRateOfReturn(rateOfReturn) {
    this.rateOfReturnView.textContent = '';

    const rateOfReturnElement = document.createElement('p');
    rateOfReturnElement.className = 'text-rate-of-return';
    rateOfReturnElement.textContent = `당신의 총 수익률은 ${rateOfReturn}%입니다.`;

    this.rateOfReturnView.appendChild(rateOfReturnElement);
    this.rateOfReturnView.classList.remove('invisible');
  }

  resetToInitialState() {
    this.rateOfReturnView.textContent = '';
    this.rateOfReturnView.classList.add('invisible');
  }
}

export default new RateOfReturnOutputView();
