class LottosOutputView {
  #section;

  render() {
    this.#section = document.querySelector("#lottos");

    this.#section.innerHTML = "";
  }

  renderLottos(lottos) {
    this.#section.innerHTML = `
      <h2 class="lottos__title">총 ${lottos.length}개를 구매하였습니다.</h2>
      <ul class="lottos__list">
        ${lottos
          .map(
            (lotto) => `
              <li class="lottos__item">
                <p class="lottos__item-icon">🎟️</p>
                <p class="lottos__item-numbers">${lotto}</p>
              </li>
            `,
          )
          .join("")}
      </ul>
    `;
  }
}

export default LottosOutputView;
