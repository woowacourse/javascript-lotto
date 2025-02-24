export default class Modal {
  constructor($target, childRender) {
    this.render($target, childRender);
  }

  render($target, childRender) {
    const $modalBg = document.createElement("div"); // 그림자
    const $modal = document.createElement("div"); //찐모달
    const $buttonWrap = document.createElement("div");
    const $button = document.createElement("button");
    $button.innerHTML = `
        <img src="../../public/x.svg" />
    `;

    $modalBg.className = "modal-bg";
    $modal.className = "modal";
    $buttonWrap.className = "modal-close-button-wrap";
    $button.className = "modal-close-button";

    $button.addEventListener("click", () => {
      $modalBg.classList.remove("modal-bg-show");
      $modal.classList.remove("modal-show");
    });

    $buttonWrap.appendChild($button);
    $modal.appendChild($buttonWrap);
    childRender($modal);
    $modalBg.appendChild($modal);
    $target.appendChild($modalBg);
  }
}
