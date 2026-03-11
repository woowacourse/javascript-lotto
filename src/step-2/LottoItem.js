const LottoItem = {
  render(target, lotto) {
    const lottoItemContainer = document.createElement('div');
    const lottoNumbersContainer = document.createElement('div');

    lottoItemContainer.id = 'lotto-item-container';

    lottoNumbersContainer.id = 'lotto-numbers-container';
    lottoNumbersContainer.innerText = lotto.parseNumbers().toString();

    lottoItemContainer.appendChild(lottoNumbersContainer);
    target.appendChild(lottoItemContainer);
  },
};

export default LottoItem;
