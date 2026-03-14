const LottoFooter = {
  render(container) {
    const footer = document.createElement('footer');

    footer.innerText = 'Copyright 2023. woowacourse';
    footer.classList.add('lotto-footer', 'text-lotto-caption');

    container.appendChild(footer);
  },
};

export default LottoFooter;
