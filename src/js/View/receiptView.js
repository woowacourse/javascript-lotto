import { ELEMENT } from "../Util/constants.js";
import { $ } from "../Util/querySelector.js";

export const printPurchaseAmountLabel = (ticketCount) => {
  $(
    ELEMENT.PURCHASE_AMOUNT_LABEL
  ).innerText = `총 ${ticketCount}개를 구매하였습니다.`;
};

export const printTicketHorizontal = (ticketCount) => {
  const ticketImageNumberContainer = $(ELEMENT.TICKET_IMAGE_NUMBER_CONTAINER);
  const ticketImageTemplate = Array(ticketCount)
    .fill(
      '<div id="lotto-image-number" class="d-flex flex-wrap"> <span class="mx-1 text-4xl">🎟️</span></div>'
    )
    .join("");

  ticketImageNumberContainer.innerHTML = ticketImageTemplate;
  ticketImageNumberContainer.classList.remove(ELEMENT.FLEX_COL);
};

export const printTicketVertical = (ticketBundle) => {
  const ticketImageNumberContainer = $(ELEMENT.TICKET_IMAGE_NUMBER_CONTAINER);
  let ticketImageNumberTemplate = "";

  ticketBundle.forEach((ticket) => {
    ticketImageNumberTemplate += `<div id="lotto-image-number" class="d-flex flex-wrap"><span class="mx-1 text-4xl">🎟️</span><span id="lotto-number" class="mx-1 mt-1 text-xl">${ticket.join(
      ", "
    )}</span></div>`;
  });

  ticketImageNumberContainer.innerHTML = ticketImageNumberTemplate;
  ticketImageNumberContainer.classList.add(ELEMENT.FLEX_COL);
};
