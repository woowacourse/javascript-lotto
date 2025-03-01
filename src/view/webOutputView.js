const purchaseResult = document.querySelector(".lotto-result .small-text");
const lottoTicketListContainer = document.querySelector(".lotto-ticket-list");
const winningRateText = document.querySelector(".winning-rate-text")

export const webOutputView = {
    displayLottoNumber(lottoList){
        purchaseResult.textContent = `총 ${lottoList.length}개 구매했습니다.`;
        lottoTicketListContainer.innerHTML = lottoList
             .map((lotto) => `
                    <div class="lotto-ticket">
                    <p class="ticket-icon">🎟️</p>
                     <p class="ticket-numbers">${lotto.numbers.join(", ")}</p>
                </div>
            `)
            .join("");
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
        winningRateText.textContent = `당신의 총 수익률은 ${winningRate}%입니다.`
    }
}