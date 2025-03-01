function showLottoResult(lottos) {
  lottos.forEach((lotto) => {
    const lottoWrapper = document.createElement('div');
    lottoWrapper.classList.add('lotto-wrapper');

    const lottoTicket = document.createElement('div');
    lottoTicket.classList.add('lotto-ticket');
    lottoTicket.textContent = '🎟️';

    const lottoNumbers = document.createElement('div');
    lottoNumbers.classList.add('lotto-numbers');
    lottoNumbers.textContent = `${lotto.numbers.join(', ')}`;

    lottoWrapper.appendChild(lottoTicket);
    lottoWrapper.appendChild(lottoNumbers);

    document.querySelector('.lotto-content').appendChild(lottoWrapper);
  });
}

export default showLottoResult;
