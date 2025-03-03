const outputView = {
  printLottoCount(lottoCount) {
    const resultContainer = document.querySelector(".lotto-result");
    resultContainer.innerHTML = `<p>${lottoCount}개를 구매했습니다.</p>`;
  },

  printLotto(lottos) {
    const resultContainer = document.querySelector(".lotto-result");
    const lottoList = lottos
      .map((lotto) => `<li>[${lotto.numbers.join(", ")}]</li>`)
      .join("");

    resultContainer.innerHTML += `<ul>${lottoList}</ul>`;
  },
};

export default outputView;
