import { showElement, hideElement, resetInput } from "../utils.js";
import {
  $confirmation,
  $lottoListLabel,
  $lottoTickets,
  $lottoNumbersToggleButton,
  $prizeTable,
  $manualPurchaseNumberInputs,
  $winningNumberInputs,
  $bonusNumberInput,
  $manualPurchaseDetail,
  $purchaseProgress,
  $purchase,
} from "../elements.js";

export default class LottoView {
  constructor() {}

  showPurchaseProgress(totalLottoCount, currentLottoCount) {
    $purchaseProgress.innerHTML = `총 ${totalLottoCount}개의 로또 중 ${currentLottoCount}개를 수동 구매하였습니다.`;
  }

  showPurchase(lottoList, price) {
    const totalLottoCount = price / 1000;

    this.showPurchaseProgress(totalLottoCount, lottoList.length);
    showElement($purchase);
  }

  showManualPurchaseDetail() {
    showElement($manualPurchaseDetail);
  }

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
              <div class="ml-2 lotto-numbers">
                ${lotto.number.join(", ")}
              </div> 
          </div>`
        )
        .join("")}
      </div>`;
  }

  showConfirmation(lottoList) {
    $lottoNumbersToggleButton.checked = false;
    $lottoListLabel.innerText = `총 ${lottoList.length}개를 구매하였습니다.`;
    this.showTickets(lottoList.length);

    showElement($confirmation);
  }

  showPrizeTable(prizeTable) {
    $prizeTable.innerHTML = [5, 4, 3, 2, 1]
      .map((rankNum) => {
        const ranking = prizeTable[`ranking${rankNum}`];

        return `
          <tr class="text-center">
            <td class="p-3">${ranking.condition}</td>
            <td class="p-3">${ranking.prize}</td>
            <td class="p-3">${ranking.num}개</td>
          </tr>
        `;
      })
      .join("");
  }

  resetManualPurchaseDetailView() {
    $manualPurchaseNumberInputs.forEach(($manualPurchaseNumberInput) =>
      resetInput($manualPurchaseNumberInput)
    );

    hideElement($manualPurchaseDetail);
  }

  resetLottoView() {
    resetInput($bonusNumberInput);
    $winningNumberInputs.forEach(($winningNumberInput) =>
      resetInput($winningNumberInput)
    );

    hideElement($confirmation);
  }
}
