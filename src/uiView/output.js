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
