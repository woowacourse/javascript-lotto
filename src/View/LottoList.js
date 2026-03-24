const LottoList = {
  render(lottos) {
    const buyCount = document.getElementById("buy-count");
    const lottoList = document.getElementById("lotto-list");

    buyCount.textContent = `총 ${lottos.length}개를 구매하였습니다.`;

    while (lottoList.firstChild) {
      lottoList.removeChild(lottoList.firstChild);
    }

    lottos.forEach((lotto) => {
      const li = document.createElement("li");
      li.className = "lotto-item";

      const icon = document.createElement("span");
      icon.className = "lotto-icon";
      icon.textContent = "🎟️";

      const numbers = document.createElement("span");
      numbers.textContent = lotto.getNumbers().join(", ");

      li.appendChild(icon);
      li.appendChild(numbers);
      lottoList.appendChild(li);
    });
  },

  show() {
    document.getElementById("lotto-section").classList.remove("hidden");
  },

  hide() {
    document.getElementById("lotto-section").classList.remove("hidden");
  },

  reset() {
    const lottoList = document.getElementById("lotto-list");
    while (lottoList.firstChild) {
      lottoList.removeChild(lottoList.firstChild);
    }
    document.getElementById("buy-count").textContent = "";
    this.hide();
  },
};

export default LottoList;
