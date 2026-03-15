import { create } from "../core/dom.js";

export const PurchaseForm = ({ onPurchase }) => {
  const $section = create("section", { className: "purchase-section" });
  const $form = create("form", { className: "purchase-form" });

  const $label = create("label", {
    className: "purchase-form-label lotto-body",
    text: "구입할 금액을 입력해주세요. ",
    htmlFor: "purchase-amount",
  });

  const $layout = create("div", { className: "purchase-layout" });

  const $input = create("input", {
    id: "purchase-amount",
    type: "number",
    className: "purchase-form-input",
    placeholder: "금액",
  });

  const $button = create("button", {
    type: "submit",
    className: "purchase-form-button lotto-cation",
    text: "구입",
  });

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = Number($input.value);
    onPurchase(amount);
  });

  $layout.append($input, $button);
  $form.append($label, $layout);
  $section.append($form);

  return $section;
};
