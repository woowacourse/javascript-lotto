import { create } from "../core/dom.js";

export const PurchaseForm = ({ onPurchase }) => {
  const $section = create("section", { className: "purchase-section" });
  const $form = create("form", { className: "purchase-form" });

  const $label = create("label", {
    className: "purchase-label",
    text: "구입할 금액을 입력해주세요. ",
  });

  const $input = create("input", {
    name: "purchase-amount",
    type: "number",
    className: "purchase-amount-input",
    placeholder: "금액",
  });

  $label.append($input);

  const $button = create("button", {
    type: "submit",
    className: "purchase-button",
    text: "구입",
  });

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = Number($input.value);
    onPurchase(amount);
  });

  $form.append($label, $button);
  $section.append($form);

  return $section;
};
