const LottoItem = {
  render(container, lotto) {
    const lottoItemContainer = document.createElement('div');
    const lottoNumbersContainer = document.createElement('div');

    lottoItemContainer.id = 'lotto-item-container';

    lottoNumbersContainer.id = 'lotto-numbers-container';
    lottoNumbersContainer.innerText = lotto.parseNumbers().toString();

    lottoItemContainer.appendChild(lottoNumbersContainer);
    container.appendChild(lottoItemContainer);
  },
};

export default LottoItem;
