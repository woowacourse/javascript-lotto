import { showElement, hideElement } from "../utils.js";
import {
  $confirmation,
  $lottoListLabel,
  $lottoTickets,
  $lottoNumbersToggleButton,
  $priceInput,
} from "../elements.js";

export default class LottoView {
  constructor() {}

  showTickets(num) {
    $lottoTickets.innerHTML = '<span class="mx-1 text-4xl">🎟️ </span>'.repeat(
      num
    );
  }

  showTicketDetails(lottoList) {
    $lottoTickets.innerHTML = `
      <div class="d-flex flex-col">
      ${lottoList
        .map(
          (lotto) => `
          <div class="d-flex flex-row items-center">
              <div class="d-felx items-center mx-1 text-4xl">🎟️ </div>
              <div class="ml-2 winning-numbers">
                ${lotto.winningNumber.join(", ")}
              </div> 
          </div>`
        )
        .join("")}
      </div>`;
  }

  showConfirmation(lottoList) {
    showElement($confirmation);
    $lottoNumbersToggleButton.checked = false;
    $lottoListLabel.innerText = `총 ${lottoList.length}개를 구매하였습니다.`;
    this.showTickets(lottoList.length);
  }

  resetLottoView() {
    $priceInput.value = "";
    hideElement($confirmation);
  }
}
