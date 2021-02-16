import { showElement } from "../utils.js";
import {
  $confirmation,
  $lottoList,
  $lottoNumbersToggleButton,
} from "../elements.js";

export default function LottoView() {
  this.getTicketTemplate = (num) => {
    return `
      <div class="d-flex">
        <label class="flex-auto my-0">총 ${num}개를 구매하였습니다.</label>
        <div class="flex-auto d-flex justify-end pr-1">
          <label class="switch">
            <input
              type="checkbox"
              class="lotto-numbers-toggle-button"
            />
            <span class="text-base font-normal">번호보기</span>
          </label>
        </div>
      </div>
      <div id="lotto-tickets" class="d-flex flex-wrap">
        ${[...Array(num)]
          .map(() => `<span class="mx-1 text-4xl">🎟️ </span>`)
          .join("")}
      </div>
    `;
  };
  this.getTicketDetailTemplate = (num) => {
    return `
      <div class="d-flex">
        <label class="flex-auto my-0">총 ${num}개를 구매하였습니다.</label>
        <div class="flex-auto d-flex justify-end pr-1">
          <label class="switch">
            <input
              type="checkbox"
              class="lotto-numbers-toggle-button"
            />
            <span class="text-base font-normal">번호보기</span>
          </label>
        </div>
      </div>
      <div id="lotto-tickets" class="d-flex flex-wrap">

      </div>
    `;
  };
  this.paintLottoList = (num) => {
    console.log($lottoNumbersToggleButton.checked);
    if ($lottoNumbersToggleButton.checked) {
      $lottoList.innerHTML = this.getTicketDetailTemplate(num);
    } else {
      $lottoList.innerHTML = this.getTicketTemplate(num);
    }
  };
  this.showConfirmation = (num) => {
    showElement($confirmation);
    this.paintLottoList(num);
  };
}
