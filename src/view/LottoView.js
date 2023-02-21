const LottoView = {
  printLottoConunt(lottoCount) {
    const text = document.getElementById("buy_count_text");
    text.innerText = `총${lottoCount}개를 구매했습니다.`;
  },

  printLottos(lottos) {
    const result = lottos
      .map((lotto) => `🎟️ ${lotto.numbers.join(", ")}\n\n`)
      .join("");
    const text = document.getElementById("buy_lottos");
    text.innerText = result;
  },
};

module.exports = LottoView;
