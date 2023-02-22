const LottoView = {
  printLottoConunt(lottoCount) {
    const text = document.getElementById("buy_count_text");
    text.innerText = `총${lottoCount}개를 구매했습니다.`;
  },

  // printLottos(lottos) {
  //   const result = lottos
  //     .map((lotto) => `🎟️ ${lotto.numbers.join(", ")}\n\n`)
  //     .join("");
  //   const text = document.getElementById("buy_lottos");
  //   text.innerText = result;
  // },

  printLottos(lottos) {
    const inputLocation = document.getElementById("buy_lottos");
    inputLocation.innerHTML = "";
    lottos.forEach((lotto) => {
      const lottoDiv = document.createElement("p");
      lottoDiv.innerText = `🎟️ ${lotto.numbers.join(", ")}`;
      lottoDiv.setAttribute("class", "lottoNum");

      inputLocation.appendChild(lottoDiv);
    });
  },

  printRankResult(rankResult, revenue) {
    const first = document.getElementById("first");
    const second = document.getElementById("second");
    const third = document.getElementById("third");
    const fourth = document.getElementById("fourth");
    const fifth = document.getElementById("fifth");

    first.innerText = `${rankResult[1]}개`;
    second.innerText = `${rankResult[2]}개`;
    third.innerText = `${rankResult[3]}개`;
    fourth.innerText = `${rankResult[4]}개`;
    fifth.innerText = `${rankResult[5]}개`;

    const revenueText = document.getElementById("revenue_text");
    revenueText.innerText = `당신의 총 수익률은 ${revenue}% 입니다.`;
  },

  alertErrorMessage(message) {
    alert(message);
  },
};

module.exports = LottoView;
