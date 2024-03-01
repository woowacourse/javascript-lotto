import "./style.css";
import LOTTO_SYSTEM from "../../../../constants/lottoSystem";

function calculateTotalRanking(rankings) {
  const initialRanking = [0, 0, 0, 0, 0, 0];

  return rankings.reduce((acc, rank) => {
    acc[rank] += 1;

    return acc;
  }, initialRanking);
}

function calculateDrawResults(ranking, count) {
  const correctCount = LOTTO_SYSTEM.correctCount[ranking];
  const prize = LOTTO_SYSTEM.lottoPrize[ranking];

  return {
    correctCount:
      ranking === 2 ? `${correctCount}개+보너스볼` : `${correctCount}개`,
    prize: `${prize.toLocaleString()}원`,
    count: `${count}개`,
  };
}

class ResultModal {
  #$parent;
  #props;

  constructor($parent, props) {
    this.#$parent = $parent;
    this.#props = props;
  }

  render() {
    const $oldResultModal = this.#$parent.querySelector("#result-modal");
    const $newResultModal = this.#generateResultModal();

    if ($oldResultModal) {
      this.#$parent.replaceChild($newResultModal, $oldResultModal);
      return;
    }

    this.#$parent.append($newResultModal);
  }

  #generateResultModal() {
    const $modalWrapper = document.createElement("div");
    $modalWrapper.id = "result-modal";
    $modalWrapper.className = "modal-wrapper";

    const $modal = this.#generateModal();

    $modalWrapper.append($modal);

    return $modalWrapper;
  }

  #generateModal() {
    const $modal = document.createElement("div");
    $modal.className = "modal";

    const $modalCloseButton = document.createElement("button");
    $modalCloseButton.className = "modal__button--close";
    $modalCloseButton.innerText = "X";
    $modalCloseButton.addEventListener("click", () => {
      const $oldResultModal = this.#$parent.querySelector("#result-modal");

      this.#$parent.removeChild($oldResultModal);
    });

    const $modalBody = this.#generateModalBody();

    $modal.append($modalCloseButton, $modalBody);

    return $modal;
  }

  #generateModalBody() {
    const $modalBody = document.createElement("div");
    $modalBody.className = "modal__body";

    const $modalBodyTitle = document.createElement("h2");
    $modalBodyTitle.className = " modal__body__title";
    $modalBodyTitle.innerText = "🏆 당첨 통계 🏆";

    const $modalBodyContent = this.#generateModalBodyContent();

    const $button = document.createElement("button");
    $button.className = "modal__body__button button--primary";
    $button.innerText = "다시 시작하기";
    $button.addEventListener("click", this.#props.onRetryButtonClick);

    $modalBody.append($modalBodyTitle, $modalBodyContent, $button);

    return $modalBody;
  }

  #generateModalBodyContent() {
    const $modalBodyContent = document.createElement("div");
    $modalBodyContent.className = "modal__body__content";

    const $modalBodyContentTable = this.#generateModalBodyContentTable();

    const $modalBodyContentProfitRate = document.createElement("div");
    $modalBodyContentProfitRate.className = "modal__body__content__profit-rate";
    $modalBodyContentProfitRate.innerText = `당신의 총 수익률은 ${
      this.#props.totalProfitRate
    }%입니다.`;

    $modalBodyContent.append(
      $modalBodyContentTable,
      $modalBodyContentProfitRate,
    );

    return $modalBodyContent;
  }

  #generateModalBodyContentTable() {
    const $table = document.createElement("div");
    $table.className = "modal__body__content__table";

    const drawResults = [];
    const totalRankings = calculateTotalRanking(this.#props.rankings);
    for (let i = totalRankings.length - 1; i > 0; i--) {
      drawResults.push(calculateDrawResults(i, totalRankings[i]));
    }

    $table.innerHTML = `
      <div class="modal__body__content__table__row">
        <span class="modal__body__content__table__cell">일치 갯수</span>
        <span class="modal__body__content__table__cell">당첨금</span>
        <span class="modal__body__content__table__cell">당첨 갯수</span>
      </div>
      ${drawResults
        .map(
          ({ correctCount, prize, count }) => `
            <div class="modal__body__content__table__row">
              <span class="modal__body__content__table__cell">${correctCount}</span>
              <span class="modal__body__content__table__cell">${prize}</span>
              <span class="modal__body__content__table__cell">${count}</span>
            </div>
          `,
        )
        .join("")}
    `;

    return $table;
  }
}

export default ResultModal;
