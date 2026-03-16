import { create } from "../core/dom.js";

export const WinningForm = ({ onShowResult }) => {
  const $section = create("section", { className: "winning-section" });
  const $form = create("form", { className: "winning-input-form" });

  const $fieldset = create("fieldset", { className: "winning-fieldset" });
  const $legend = create("legend", {
    text: "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.",
  });

  const $labelRow = create("div", { className: "winning-label-row" });
  const $winningLabel = create("span", {
    text: "당첨 번호",
    className: "winning-label",
  });
  const $bonusLabel = create("label", {
    text: "보너스 번호",
    className: "bonus-label",
    htmlFor: "bonus-number",
  });

  $labelRow.append($winningLabel, $bonusLabel);

  const $inputRow = create("div", { className: "winning-input-row" });
  const $numberInputs = Array.from({ length: 6 }, () =>
    create("input", {
      name: "winning-number",
      type: "number",
      className: "winning-number-input",
      required: true,
    }),
  );

  const $bonusInput = create("input", {
    type: "number",
    id: "bonus-number",
    className: "bonus-number-input",
    required: true,
  });

  $inputRow.append(...$numberInputs, $bonusInput);

  const $submitButton = create("button", {
    type: "submit",
    className: "open-result-button lotto-button",
    text: "결과 확인하기",
  });

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const winningNumbers = $numberInputs.map(($input) => Number($input.value));
    const bonusNumber = Number($bonusInput.value);
    onShowResult({ winningNumbers, bonusNumber });
  });

  $fieldset.append($legend, $labelRow, $inputRow);
  $form.append($fieldset, $submitButton);
  $section.append($form);

  return $section;
};
