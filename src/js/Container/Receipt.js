import messenger from "../Messenger.js";
import { ELEMENT, MESSAGE } from "../Util/constants.js";
import { hideContainer, showContainer } from "../Util/DOM.js";
import { $ } from "../Util/querySelector.js";

class Receipt {
  constructor() {
    messenger.addMessageListener(
      MESSAGE.TICKET_ADDED_AS_BALANCE,
      this.handleReceipt.bind(this)
    );

    $(ELEMENT.TOGGLE_BUTTON).addEventListener(
      "click",
      this.handleToggleButton.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.RESTART_BUTTON_CLICKED,
      this.reset.bind(this)
    );
  }

  reset() {
    $(ELEMENT.TICKET_IMAGE_NUMBER_AREA).innerHTML = "";
    $(ELEMENT.TOGGLE_BUTTON).checked = false;
    hideContainer(ELEMENT.RECEIPT_CONTAINER);
  }

  handleReceipt({ tickets }) {
    this.tickets = tickets;

    showContainer(ELEMENT.RECEIPT_CONTAINER);
    this.render();
  }

  handleToggleButton(event) {
    event.target.checked
      ? this.printTicketsVertical()
      : this.printTicketsHorizontal();
  }

  render() {
    this.printPurchaseAmountLabel();
    this.printTicketsHorizontal();
  }

  printPurchaseAmountLabel() {
    $(
      ELEMENT.PURCHASE_AMOUNT_LABEL
    ).innerText = `총 ${this.tickets.length}개를 구매하였습니다.`;
  }

  printTicketsHorizontal() {
    const ticketImageNumberArea = $(ELEMENT.TICKET_IMAGE_NUMBER_AREA);
    const ticketImageTemplate = Array(this.tickets.length)
      .fill(
        '<div id="lotto-image-number" class="d-flex flex-wrap"> <span class="mx-1 text-4xl">🎟️</span></div>'
      )
      .join("");

    ticketImageNumberArea.innerHTML = ticketImageTemplate;
    ticketImageNumberArea.classList.remove(ELEMENT.FLEX_COL);
  }

  printTicketsVertical() {
    const ticketImageNumberArea = $(ELEMENT.TICKET_IMAGE_NUMBER_AREA);
    let ticketImageNumberTemplate = "";

    this.tickets.forEach((ticket) => {
      ticketImageNumberTemplate += `<div id="lotto-image-number" class="d-flex flex-wrap"><span class="mx-1 text-4xl">🎟️</span><span id="lotto-number" class="mx-1 mt-1 text-xl">${ticket.join(
        ", "
      )}</span></div>`;
    });

    ticketImageNumberArea.innerHTML = ticketImageNumberTemplate;
    ticketImageNumberArea.classList.add(ELEMENT.FLEX_COL);
  }
}

export default Receipt;
