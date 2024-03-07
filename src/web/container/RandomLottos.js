const RandomLottos = {
  showRandomLottos(selector = '', lottos = []) {
    const randomLottoContainer = document.querySelector(selector);
    randomLottoContainer.innerHTML = this.listRandomLottos(lottos);
    return lottos;
  },

  listRandomLottos(lottos) {
    return `
    <div>
      <div class = "random-lottos-result-title">총 ${
        lottos.length
      }개를 구매하였습니다.</div>
        <ul>
          ${lottos
            .map(
              (lotto) =>
                `<li class="random-lotto-list">🎟️ <span class = 'lotto-list-p'>${lotto
                  .getLotto()
                  .join(', ')}<span></p></li>`,
            )
            .join('')}
        </ul>
      </div>
    `;
  },
};
export default RandomLottos;
