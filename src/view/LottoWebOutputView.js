const lottoList = document.querySelector(".lotto-list");
const lottoCount = document.querySelector("#lotto-count");

export const LottoWebOutputView = {
  renderLottoCount(count) {
    lottoCount.innerText = `총 ${count}개를 구매했습니다.`;
  },

  renderLottos(lottos) {
    lottoList.innerHTML = lottos
      .map(
        (lotto) => `
        <li class="text-body">
          <span class="lotto-image">🎟️</span>
          ${lotto.getNumbers().join(", ")}
        </li>
      `,
      )
      .join("");
  },
};
