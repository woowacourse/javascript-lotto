const LottoHeader = {
  render(container) {
    const header = document.createElement('header');
    const h1 = document.createElement('h1');

    header.classList.add('lotto-header');

    h1.innerText = '🎱 행운의 로또';
    h1.classList.add('text-lotto-title');

    header.appendChild(h1);
    container.appendChild(header);
  },
};

export default LottoHeader;
