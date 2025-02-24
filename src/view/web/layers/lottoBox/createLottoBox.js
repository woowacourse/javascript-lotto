import { PROMPT_MESSAGE } from "../../../../constants/message.js";
import "./lottoBox.css";

const createLottoBox = (lottoNumbers) => {
  const gameBox = document.getElementById("gameBox-container");
  const lottoBox = document.createElement("div");
  lottoBox.id = "lotto-container";
  gameBox.appendChild(lottoBox);

  const purchaseMessageSpan = document.createElement("span");
  const purchaseQuantityMessage = `${lottoNumbers.length}${PROMPT_MESSAGE.PURCHASE_QUANTITY}`;
  purchaseMessageSpan.id = "purchase-quantity-message";
  purchaseMessageSpan.append(purchaseQuantityMessage);
  lottoBox.appendChild(purchaseMessageSpan);

  const ul = document.createElement("ul");
  ul.className = "lotto-list";

  lottoNumbers.forEach((numbers, index) => {
    const li = document.createElement("li");
    li.className = "lotto-numbers";
    li.id = `lotto-numbers-${index}`;

    const span = document.createElement("span");
    span.className = "lotto-icon";
    span.id = `lotto-icon-${index}`;
    span.append("🎟️");

    const textNode = document.createTextNode(numbers.join(", "));

    li.appendChild(span);
    li.appendChild(textNode);
    ul.appendChild(li);
    lottoBox.appendChild(ul);
  });
};

export default createLottoBox;
