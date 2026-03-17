// DOM 관련 렌더링을 담당하는 클래스
export default class WebView {
    constructor() {
        this.purchaseInput = document.getElementById("purchaseinput");
        this.purchaseForm = document.getElementById("purchaseForm");
        this.resultButton = document.getElementById("resultButton");
        this.lottoCount = document.getElementById("lottoCount");
        this.lottoDetails = document.getElementById("lottoDetails");
        this.lottoList = this.createLottoListElement();
        this.modal = document.getElementById("resultModal");
        this.modalClose = document.getElementById("modalClose");
        this.modalBackdrop = document.getElementById("modalBackdrop");
        this.statsBody = document.getElementById("statsBody");
        this.profitRate = document.getElementById("profitRate");
        this.restartButton = document.getElementById("restartButton");
    }

    onPurchaseSubmit(handler) {
        this.purchaseForm.addEventListener("submit", (e) => {
            e.preventDefault();
            handler();
        });
    }

    onResultClick(handler) {
        this.resultButton.addEventListener("click", () => handler());
    }

    onRestartClick(handler) {
        this.restartButton.addEventListener("click", () => handler());
    }

    onModalClose(handler) {
        this.modalClose.addEventListener("click", () => handler());
        this.modalBackdrop.addEventListener("click", () => handler());
    }

    showPurchaseResult(count, lottos) {
        this.lottoDetails.classList.remove("is-hidden");
        this.lottoCount.classList.remove("error");
        this.lottoCount.innerText = `총 ${count}개를 구매했습니다.`;
        this.renderLottos(lottos);
    }

    showError(message) {
        this.lottoCount.classList.add("error");
        this.lottoCount.innerText = message;
    }

    showStats(stats, profitRate) {
        this.renderStats(stats);
        this.profitRate.innerText = profitRate;
        this.showModal();
    }

    showModal() {
        this.modal.classList.remove("is-hidden");
    }

    hideModal() {
        this.modal.classList.add("is-hidden");
    }

    reset() {
        this.purchaseInput.value = "";
        this.lottoCount.innerText = "";
        this.lottoCount.classList.remove("error");
        this.lottoDetails.classList.add("is-hidden");
        this.lottoList.innerHTML = "";
        this.hideModal();

        document.querySelectorAll(".winning-numbers .number-input").forEach((input) => {
            input.value = "";
        });

        const bonusInput = document.querySelector(".bonus-number .number-input");
        if (bonusInput) bonusInput.value = "";
    }

    createLottoListElement() {
        const lottoCountElement = document.getElementById("lottoCount");
        const lottoListElement = document.createElement("div");
        lottoListElement.id = "issued-lottos";
        lottoCountElement.insertAdjacentElement("afterend", lottoListElement);
        return lottoListElement;
    }

    renderLottos(lottos) {
        this.lottoList.innerHTML = "";
        lottos.forEach((lotto) => {
            const row = document.createElement("p");
            row.innerText = `🎟️ ${lotto.getNumbers().join(", ")}`;
            this.lottoList.appendChild(row);
        });
    }

    renderStats(stats) {
        this.statsBody.innerHTML = "";
        const rows = [
            { key: 3, label: "3개" },
            { key: 4, label: "4개" },
            { key: 5, label: "5개" },
            { key: "5개 번호 + 보너스 번호 일치", label: "5개+보너스볼" },
            { key: 6, label: "6개" },
        ];

        rows.forEach(({ key, label }) => {
            const { count, prize } = stats[key];
            const row = document.createElement("tr");
            const matchCell = document.createElement("td");
            const prizeCell = document.createElement("td");
            const countCell = document.createElement("td");

            matchCell.innerText = label;
            prizeCell.innerText = prize.toLocaleString();
            countCell.innerText = `${count}개`;

            row.appendChild(matchCell);
            row.appendChild(prizeCell);
            row.appendChild(countCell);
            this.statsBody.appendChild(row);
        });
    }
}
