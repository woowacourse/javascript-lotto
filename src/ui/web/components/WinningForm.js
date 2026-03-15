import { create } from "../core/dom.js";

export const WinningForm = ({ onShowResult }) => {
  const $section = create("section", { className: "winning-section" });
  const $title = create("h3", { text: "지난 주 당첨 번호를 입력해 주세요." });
  const $form = create("form", { className: "winning-input-form" });

  const $winningFieldset = create("fieldset", {
    className: "winning-number-inputs",
  });

  const $winningLegend = create("legend", {
    text: "지난 주 당첨 번호를 입력해 주세요.",
  });

  $winningFieldset.append($winningLegend);

  const $numbersContainer = create("div", {
    className: "winning-numbers-container",
  });

  const $numberInputs = Array.from({ length: 6 }, (_, i) =>
    create("input", {
      name: "winning-number",
      type: "number",
      className: "winning-number-input",
      required: true,
    }),
  );

  $numbersContainer.append(...$numberInputs);

  const $bonusLabel = create("label", { text: "보너스 번호" });
  const $bonusInput = create("input", {
    type: "number",
    name: "bonus-number",
    className: "bonus-number-input",
    placeholder: "번호",
    required: true,
  });

  const $submitButton = create("button", {
    type: "submit",
    className: "open-result-button",
    text: "결과 확인하기",
  });

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    const winningNumbers = $numberInputs.map(($input) => Number($input.value));
    const bonusNumber = Number($bonusInput.value);

    onShowResult({ winningNumbers, bonusNumber });
  });

  $winningFieldset.append(
    $winningLegend,
    $numbersContainer,
    $bonusLabel,
    $bonusInput,
    $submitButton,
  );
  $form.append($winningFieldset);
  $section.append($title, $form);

  return $section;
};
