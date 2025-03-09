const lottoContainer = document.querySelector(".lotto-container");

const printLottoTickets = (lottoTickets) => {
  lottoContainer.innerHTML = "";

  lottoTickets.forEach((ticket) => {
    const lottoElement = document.createElement("div");
    lottoElement.classList.add("lotto");
    lottoElement.innerHTML = `
      <span class="lotto-img">🎟️</span>
      <span class="lotto-numbers">${ticket.join(", ")}</span>
    `;

    lottoContainer.appendChild(lottoElement);
  });
};

const resetLottoTicketsUI = () => {
  lottoContainer.innerHTML = "";
};

export { printLottoTickets, resetLottoTicketsUI };
