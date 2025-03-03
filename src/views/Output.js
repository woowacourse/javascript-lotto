import { MATCH_KEY, MATCH_PRIZE } from "../constants/statisticConstants.js";
import { MIN_UNIT } from "../constants/validateConstants.js";

const Output = {
  printError(errorMessage) {
    console.error(`[ERROR] ${errorMessage}`);
    alert(`[ERROR] ${errorMessage}`);
  },

  printIssuedLottos(lottos) {
    const lottoCount = lottos.length;
    console.log(`${lottoCount}개를 구매했습니다.`);
    console.log(lottos.map((lotto) => lotto.join(", ")).join("\n"));
  },

  printStatistics(statistics) {
    console.log("\n당첨 통계\n--------------------");
    console.log(
      `${MATCH_KEY.THREE}개 일치 (${MATCH_PRIZE.THREE.toLocaleString()}원) - ${
        statistics.get(MATCH_KEY.THREE).count
      }개`
    );
    console.log(
      `${MATCH_KEY.FOUR}개 일치 (${MATCH_PRIZE.FOUR.toLocaleString()}원) - ${
        statistics.get(MATCH_KEY.FOUR).count
      }개`
    );
    console.log(
      `${MATCH_KEY.FIVE}개 일치 (${MATCH_PRIZE.FIVE.toLocaleString()}원) - ${
        statistics.get(MATCH_KEY.FIVE).count
      }개`
    );
    console.log(
      `${
        MATCH_KEY.FIVE
      }개 일치, 보너스 볼 일치 (${MATCH_PRIZE.FIVE_AND_BONUS.toLocaleString()}원) - ${
        statistics.get(MATCH_KEY.FIVE_AND_BONUS).count
      }개`
    );
    console.log(
      `${MATCH_KEY.SIX}개 일치 (${MATCH_PRIZE.SIX.toLocaleString()}원) - ${
        statistics.get(MATCH_KEY.SIX).count
      }개`
    );
  },

  printProfitRatio(profitRatio) {
    console.log(`총 수익률은 ${profitRatio}%입니다.`);
  },

  displayWinningStatistics(winningStatistics) {
    const modalOverlay = document.querySelector("#modal-overlay");
    const statisticsModal = document.querySelector("#winning-statistics-modal");
    const resultsTable = document.querySelector(".lotto-table tbody");
    const profitRateText = document.querySelector(".winnind-rate");
    const closeModalButton = document.querySelector("#close-modal");

    if (!modalOverlay || !statisticsModal || !resultsTable || !profitRateText) {
      console.error("❌ 필요한 요소를 찾을 수 없습니다!");
      return;
    }

    modalOverlay.style.display = "flex";
    statisticsModal.style.display = "block";

    resultsTable.innerHTML = "";

    const prizeData = [
      { match: 3, prize: "5,000", key: "THREE" },
      { match: 4, prize: "50,000", key: "FOUR" },
      { match: 5, prize: "1,500,000", key: "FIVE" },
      { match: "5+보너스볼", prize: "30,000,000", key: "FIVE_AND_BONUS" },
      { match: 6, prize: "2,000,000,000", key: "SIX" },
    ];

    prizeData.forEach(({ match, prize, key }) => {
      const count = winningStatistics.statistics.get(key)?.count ?? 0;

      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${match}개</td>
            <td>${prize}원</td>
            <td>${count}개</td>
        `;
      resultsTable.appendChild(row);
    });

    const profitRatio = winningStatistics.calculateProfitRatio();
    profitRateText.textContent = `당신의 총 수익률은 ${profitRatio}%입니다.`;

    closeModalButton.addEventListener("click", () => {
      modalOverlay.style.display = "none";
      statisticsModal.style.display = "none";
    });

    document.querySelector("#restart-btn").addEventListener("click", () => {
      modalOverlay.style.display = "none";
      statisticsModal.style.display = "none";
    });
  },
};

export default Output;
