import { DOM } from "../utils/DomSelector.js";

export const webOutputView = {
    displayLottoNumber(lottoList){
        DOM.purchaseResult.textContent = `총 ${lottoList.length}개 구매했습니다.`;
        DOM.lottoTicketListContainer.innerHTML = lottoList
             .map((lotto) => `
                    <div class="lotto-ticket">
                    <p class="ticket-icon">🎟️</p>
                     <p class="ticket-numbers">${lotto.numbers.join(", ")}</p>
                </div>
            `)
            .join("");
        DOM.winningForm.style.visibility = "visible";
    },

    result(lottoResult){
        const rankingRows = document.querySelectorAll(".statistics-table tbody tr");

        const rankingKeys = ["5", "4", "3", "2", "1"];
    
        rankingRows.forEach((row, index) => {
            const rank = rankingKeys[index];
            const countCell = row.querySelector("td:last-child");
            countCell.textContent = `${lottoResult.result[rank]}개`;
        });
    },

    winningRate(winningRate){
        DOM.winningRateText.textContent = `당신의 총 수익률은 ${winningRate}%입니다.`
    }
}