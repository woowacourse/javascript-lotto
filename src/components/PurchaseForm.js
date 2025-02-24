export default class {
  constructor($target) {
    this.render($target);
  }

  render($target) {
    const $form = document.createElement("form");

    $form.innerHTML = `
        <span class="purchase-form-info-text">구입할 금액을 입력해주세요.</span>
        <div class="purchase-form-input-wrap">
            <input class="purchase-form-input" placeholder="금액" />
            <button class="purchase-form-button" type="button">구입</button>
        </div>
    `;

    $target.appendChild($form);
  }
}
