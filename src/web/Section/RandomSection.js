const RandomSection = {
  showRandomLottos(selector = '', lottos = []) {
    const randomLottoContainer = document.querySelector(selector);
    while (randomLottoContainer.firstChild) {
      randomLottoContainer.removeChild(randomLottoContainer.firstChild);
    }
    randomLottoContainer.appendChild(this.createRandomLottos(lottos));
  },

  createRandomLottos(lottos = []) {
    const containerDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    titleDiv.className = 'random-lottos-result-title';
    titleDiv.textContent = `총 ${lottos.length}개를 구매하였습니다.`;
    containerDiv.appendChild(titleDiv);
    containerDiv.appendChild(this.createRandomLottoList(lottos));
    return containerDiv;
  },

  createRandomLottoList(lottos = []) {
    const ul = document.createElement('ul');
    const fragment = document.createDocumentFragment();
    lottos.forEach((lotto) => {
      const li = document.createElement('li');
      li.className = 'random-lotto-list';
      const span = document.createElement('span');
      span.className = 'lotto-list-p';
      span.textContent = lotto.getNumbers().join(', ');
      li.textContent = '🎟️ ';
      li.appendChild(span);
      fragment.appendChild(li);
    });
    ul.appendChild(fragment);
    return ul;
  },
};

export default RandomSection;
