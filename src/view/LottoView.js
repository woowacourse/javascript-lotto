const LottoView = {
  // readMoney(event) {
  //   event.preventDefault();
  //   const text = document.getElementById("buy_count_text");
  //   const money = document.getElementById("input_money").value;
  //   text.innerText = `총${money}개를 구매했습니다.`;
  //   // return money;
  // },

  printLottoConunt(lottoCount) {
    //event.preventDefault();
    const text = document.getElementById("buy_count_text");
    text.innerText = `총${lottoCount}개를 구매했습니다.`;
    // return money;
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
