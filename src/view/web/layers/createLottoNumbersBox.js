import { PROMPT_MESSAGE } from "../../../constants/message.js";
import "./lottoNumbersBox.css";

const createLottoNumbersBox = (lottoNumbers) => {
  const gameBox = document.getElementsByClassName("gameBox-container")[0];
  const lottoNumbersBox = document.createElement("div");
  lottoNumbersBox.className = "lotto-numbers-container";
  gameBox.appendChild(lottoNumbersBox);

  const purchaseMessageSpan = document.createElement("span");
  const purchaseQuantityMessage = `${lottoNumbers.length}${PROMPT_MESSAGE.PURCHASE_QUANTITY}`;
  purchaseMessageSpan.id = "purchase-quantity-message";
  purchaseMessageSpan.append(purchaseQuantityMessage);
  lottoNumbersBox.appendChild(purchaseMessageSpan);

  const ul = document.createElement("ul");
  ul.className = "lotto-numbers-list";

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
    lottoNumbersBox.appendChild(ul);
  });
};

export default createLottoNumbersBox;
