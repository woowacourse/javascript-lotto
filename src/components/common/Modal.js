import customCreateElement from "../../utils/customElement.js";

export default class Modal {
  constructor($target, childRender) {
    this.render($target, childRender);
  }

  render($target, childRender) {
    const $modalBg = customCreateElement({
      tagName: "div",
      className: "modal-bg",
    });
    const $modal = customCreateElement({
      tagName: "div",
      className: "modal",
    });
    const $buttonWrap = customCreateElement({
      tagName: "div",
      className: "modal-close-button-wrap",
    });
    const $button = customCreateElement({
      tagName: "button",
      className: "modal-close-button",
    });
    const $iconImage = document.createElement("img");
    $iconImage.src = "../../public/x.svg";

    $button.appendChild($iconImage);

    $button.addEventListener("click", () => {
      $modalBg.classList.add("modal-none");
      $modal.classList.add("modal-none");
    });

    $buttonWrap.appendChild($button);
    $modal.appendChild($buttonWrap);
    childRender($modal);
    $modalBg.appendChild($modal);
    $target.appendChild($modalBg);
  }
}
