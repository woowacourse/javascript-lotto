const WebView = {
  showLottoList(lottoNumberArray) {
    const list = document.getElementById("lotto_list");

    lottoNumberArray.forEach((lottoNumber) => {
      const li = document.createElement("li");
      const icon = document.createElement("span");
      const lotto = document.createElement("span");
      icon.innerText = "🎟️";
      lotto.innerText = lottoNumber.sort((a, b) => a - b).join(", ");
      li.appendChild(icon);
      li.appendChild(lotto);
      list.appendChild(li);
    });
  },

  showGameResult(rank) {
    const rankArray = Object.values(rank);
    const reversedRank = rankArray.slice().reverse();

    const tableRows = document.querySelectorAll(
      "#result_body tr:not(:first-child)",
    );
    tableRows.forEach((row, index) => {
      const tdElement = row.querySelector("td:nth-child(3)");
      if (tdElement) {
        tdElement.textContent = `${reversedRank[index]}개`;
      }
    });
  },

  showProfit(profit) {
    const profitElement = document.getElementById("profit");
    profitElement.textContent = `당신의 총 수익률은 ${profit}%입니다.`;
  },
};
export default WebView;
