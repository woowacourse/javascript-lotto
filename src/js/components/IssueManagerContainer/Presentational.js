import {
  $,
  notify,
  toDataAttributeSelector as toDAS,
} from "../../utils/index.js";
import TEMPLATE from "./template.js";

const createPresentational = () => {
  const $container = $(toDAS("issue-manager-container"));
  const $title = $(toDAS("issue-manager-container__title"));
  const $form = $(toDAS("issue-manager-form"));
  const $entryList = $(toDAS("issue-manager-form__entry-list"));

  const render = ({ totalIssuableLottoCount, addedIssuableLottoCount }) => {
    if (totalIssuableLottoCount === 0) {
      $title.innerHTML = "";
      $entryList.innerHTML = "";
      $container.hide();
      return;
    }

    $title.innerText = TEMPLATE.TITLE(totalIssuableLottoCount);

    const newEntries = Array.from({ length: addedIssuableLottoCount })
      .map((_, i) => i + $entryList.childElementCount)
      .map((entryIndex) => TEMPLATE.ENTRY(entryIndex))
      .join("\n");
    $entryList.insertAdjacentHTML("beforeend", newEntries);

    $container.show();
  };

  const notifyError = (message) => {
    notify(message);
  };

  const toggleDisabled = (event) => {
    const {
      checked,
      type,
      value,
      dataset: { entryIndex },
    } = event.target;

    if (type !== "radio" || !checked) return;

    const $$numberTypeInputs = Array.from(
      event.currentTarget.elements[`entry__number-${entryIndex}`]
    );

    $$numberTypeInputs.forEach(($input) => {
      if (value === "auto") {
        $input.disabled = true;
        $input.value = "";
        return;
      }

      $input.disabled = false;
    });
  };

  const reset = (event) => {
    event.preventDefault();

    if (!confirm("수동으로 기입한 로또 번호들을 초기화하시겠습니까?")) {
      return;
    }

    Array.from(event.target.elements)
      .filter(($input) => $input.type === "number")
      .forEach(($input) => {
        $input.value = "";
        $input.disabled = true;
      });
  };

  const init = (createAction) => {
    $form.addEventListener("submit", createAction);
    $form.addEventListener("reset", reset);
    $form.addEventListener("click", toggleDisabled);
  };

  return { init, notifyError, render };
};

const Presentational = createPresentational();

export default Presentational;
