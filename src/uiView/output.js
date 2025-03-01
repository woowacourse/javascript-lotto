import commaizeNumber from "../utils/commaizeNumber.js";

export const printLottoCount = (count) => {
  const purchaseHistoryEl = document.querySelector(".purchase-history");
  const countEl = document.createElement("p");
  countEl.textContent = `총 ${count}개를 구매했습니다.`;
  countEl.classList.add("count");
  purchaseHistoryEl.prepend(countEl);
};

export const printLottoNumbers = (numbers) => {
  const lottoListEl = document.querySelector(".lotto-list");

  const numbersEl = document.createElement("li");
  numbersEl.classList.add("lotto-numbers");
  lottoListEl.appendChild(numbersEl);

  const ticketImg = document.createElement("span");
  ticketImg.classList.add("lotto-ticket__img");
  ticketImg.innerText = "🎟️";
  numbersEl.appendChild(ticketImg);

  numbersEl.append(`${numbers}`);
};

export const printResult = (results) => {
  const resultTableEl = document.querySelector(".modal .description");
  results.map(({ rank, winningCriteria, reward, count }) => {
    const bonusText = rank === "SECOND" ? "+보너스볼" : "";
    const tr = document.createElement("tr");
    tr.classList.add("result__row");
    tr.innerHTML = `
      <td>${winningCriteria}개${bonusText}</td>
      <td>${commaizeNumber(reward)}</td>
      <td>${count}개</td>`;
    resultTableEl.appendChild(tr);
  });
};

export const printProfitRate = (profit) => {
  const resultTableEl = document.querySelector(".modal .description");

  const profitRateEl = document.createElement("p");
  profitRateEl.classList.add("profit");
  profitRateEl.innerText = `당신의 총 수익률은 ${commaizeNumber(
    profit
  )}%입니다.`;

  resultTableEl.after(profitRateEl);
};

export const disabledTarget = (target, whether) => {
  target.disabled = whether;
};

export const removeActiveClass = () => {
  document.querySelector(".overlay").classList.remove("active");
  document.querySelector(".winning-lotto").classList.remove("active");
};

export const clearResultList = () => {
  document.querySelector(".purchase-history").replaceChildren();
  [...document.querySelectorAll(".result__row")].map((resultRow) => {
    resultRow.remove();
  });
  document.querySelector(".profit").remove();
};

export const clearInput = () => {
  document.querySelector(".purchase input").value = "";
  [...document.querySelectorAll(".winning-number")].map(
    (winningNumberInput) => {
      winningNumberInput.value = "";
    }
  );
  document.querySelector(".bonus-number").value = "";
};
