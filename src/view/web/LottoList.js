import lottoIcon from "../../asset/lotto_icon.png";

class LottoList {
  constructor() {
    this.$lottoListSection = document.querySelector(".lotto-list");
  }

  renderLottoList(lottos) {
    this.$lottoListSection.innerHTML = `
      <p class="text-lotto-body lotto-list__count">총 ${lottos.length}개를 구매하였습니다.</p>
      <div class = "lotto-list__container" >
        ${lottos.map((lotto) => this._lottoTemplate(lotto)).join("")}
      </div>
    `;
  }

  _lottoTemplate(lotto) {
    return `
      <div class="lotto-list__item"> <img src="${lottoIcon}" alt="lotto-icon" class="lotto-list__icon" />
        <p class="text-lotto-body lotto-list__numbers">${lotto.getNumbers().join(", ")}</p>
      </div>
    `;
  }

  reset() {
    this.$lottoListSection.innerHTML = "";
  }
}

export default LottoList;
