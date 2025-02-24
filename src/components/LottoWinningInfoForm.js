import Button from "../common/button.js";

export default class LottoWinningInfoForm {
  constructor($target) {
    this.render($target);
  }

  render($target) {
    const $form = document.createElement("form");
    $form.className = "hidden lotto-winning-info-form";

    $form.innerHTML = `
    <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
    <div class="lotto-number-input-container">
        <div class="lotto-number-input-wrap">
            <span>당첨 번호</span>
            <div class="lotto-numbers-wrap">
            ${Array.from(
              { length: 6 },
              () => '<input class="number-input" />'
            ).join("")}
            </div>
        </div>
        <div class="lotto-number-input-wrap bonus-input-wrap">
            <span>보너스 번호</span>
            <input class="number-input" />
        </div>
    </div>
`;

    new Button(
      $form,
      () => {
        const $modalBg = document.querySelector(".modal-bg");
        const $container = document.querySelector(".modal");

        $modalBg.classList.add("modal-bg-show");
        $container.classList.add("modal-show");
      },
      "결과 확인하기"
    );
    $target.appendChild($form);
  }
}
