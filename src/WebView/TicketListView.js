import ticketImage from "../../assets/lotto_ticket.png";
class TicketListView {
  #list;
  #summary;
  #container;

  constructor() {
    this.#list = document.querySelector(".ticket-list");
    this.#summary = document.querySelector(".ticket-list__summary");
    this.#container = document.querySelector(".ticket-list__container");
  }

  init() {
    this.#container.innerHTML = "";
    this.hide();
  }

  show() {
    this.#list.style.visibility = "visible";
  }

  hide() {
    this.#list.style.visibility = "hidden";
  }

  renderAllTickets(allLottoNumbers) {
    allLottoNumbers.forEach((lottoNumber) =>
      this.#container.appendChild(this.#getTicket(lottoNumber)),
    );
  }

  renderPurchaseLottoCount(purchaseLottoCount) {
    this.#summary.innerText = `총 ${purchaseLottoCount}개를 구매하였습니다.`;
  }

  #getTicket(lottoNumbers) {
    const ticket = document.createElement("div");
    ticket.className = "ticket-list__item";

    const ticketIcon = document.createElement("img");
    ticketIcon.className = "ticket-list__icon";
    ticketIcon.src = ticketImage;

    const lottoNumberSpan = document.createElement("span");
    lottoNumberSpan.className = "ticket-list__numbers";
    const numberText = document.createTextNode(lottoNumbers.join(", "));
    lottoNumberSpan.appendChild(numberText);

    ticket.appendChild(ticketIcon);
    ticket.appendChild(lottoNumberSpan);

    return ticket;
  }
}

export default TicketListView;
