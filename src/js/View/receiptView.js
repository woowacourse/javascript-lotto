import { Element } from "../Util/constants.js";
import { $ } from "../Util/querySelector.js";

export const printPurchaseAmountLabel = (ticketCount) => {
  $(
    Element.PURCHASE_AMOUNT_LABEL
  ).innerText = `총 ${ticketCount}개를 구매하였습니다.`;
};

export const printTicketHorizontal = (ticketCount) => {
  const ticketImageNumberContainer = $(Element.TICKET_IMAGE_NUMBER_CONTAINER);
  // let ticketImageTemplate = "";

  // for (let i = 0; i < ticketCount; i++) {
  //   ticketImageTemplate +=
  //     '<div id="lotto-image-number" class="d-flex flex-wrap"> <span class="mx-1 text-4xl">🎟️</span></div>';
  // }

  const ticketImageTemplate = Array(ticketCount)
    .fill(
      '<div id="lotto-image-number" class="d-flex flex-wrap"> <span class="mx-1 text-4xl">🎟️</span></div>'
    )
    .join("");

  ticketImageNumberContainer.innerHTML = ticketImageTemplate;
  ticketImageNumberContainer.classList.remove(Element.FLEX_COL);
};

export const printTicketVertical = (tickets) => {
  const ticketImageNumberContainer = $(Element.TICKET_IMAGE_NUMBER_CONTAINER);
  let ticketImageNumberTemplate = "";

  tickets.forEach((lotto) => {
    ticketImageNumberTemplate += `<div id="lotto-image-number" class="d-flex flex-wrap"><span class="mx-1 text-4xl">🎟️</span><span id="lotto-number" class="mx-1 mt-1 text-xl">${lotto.numbers.join(
      ", "
    )}</span></div>`;
  });

  ticketImageNumberContainer.innerHTML = ticketImageNumberTemplate;
  ticketImageNumberContainer.classList.add(Element.FLEX_COL);
};
