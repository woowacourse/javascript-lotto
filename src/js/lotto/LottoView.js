import { showElement, hideElement } from "../utils.js";
import {
  $confirmation,
  $lottoListLabel,
  $lottoTickets,
  $lottoNumbersToggleButton,
  $priceInput,
} from "../elements.js";

export default function LottoView() {
  this.getTicketTemplate = (num) => {
    return '<span class="mx-1 text-4xl">🎟️ </span>'.repeat(num);
  };

  this.getTicketDetailTemplate = (lottoList) => {
    return `
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
  };

  this.paintLottoList = (lottoList, toggleChecked) => {
    $lottoListLabel.innerText = `총 ${lottoList.length}개를 구매하였습니다.`;
    $lottoTickets.innerHTML = toggleChecked
      ? this.getTicketDetailTemplate(lottoList)
      : this.getTicketTemplate(lottoList.length);
  };

  this.showConfirmation = (lottoList) => {
    showElement($confirmation);
    $lottoNumbersToggleButton.checked = false;
    this.paintLottoList(lottoList, false);
  };

  this.resetLottoView = () => {
    $priceInput.value = "";
    hideElement($confirmation);
  };
}
