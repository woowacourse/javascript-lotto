export const renderPurchaseCount = (count) => {
  document.getElementById("purchase-count-span").textContent =
    `총 ${count}개를 구매하였습니다.`;
};

export const renderLottoList = (lottos) => {
  const section = document.getElementById("purchase-lotto-section");
  section.innerHTML = "";
  lottos.forEach((lotto) => {
    const row = document.createElement("div");
    row.id = "purchase-lottos";
    row.innerHTML = `<span id="lotto-icon">🎟️</span><span class="game-container-span">${lotto.getNumbers().join(", ")}</span>`;
    section.appendChild(row);
  });
};

export const renderStatistics = (prizeList, profitRate) => {
  const rows = document.querySelectorAll("#statistics-table tbody tr");
  const order = [5, 4, 3, 2, 1];
  rows.forEach((row, index) => {
    row.cells[2].textContent = `${prizeList[order[index]]}개`;
  });
  document.getElementById("profit-div").textContent =
    `당신의 총 수익률은 ${profitRate}%입니다.`;
};

export const resetGame = () => {
  document.getElementById("purchase-count-span").textContent = "";
  document.getElementById("purchase-lotto-section").innerHTML = "";
  document.querySelector("#purchase-input-section input").value = "";
  document.querySelectorAll("#winning-inputs-div input").forEach((element) => {
    element.value = "";
  });
  document.querySelector("#winning-bonus-div input").value = "";
};
