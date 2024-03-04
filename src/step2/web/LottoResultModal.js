import {
  LOTTO_RANK_CONDITION,
  LOTTO_REWARDS,
} from "../../step1/constants/rules.js";
import LottoResult from "../../step1/domains/LottoResult.js";
import { addEvent } from "../utils/addEvent.js";
import { getLottoRules } from "../utils/getLottoRules.js";
import { printReturnRate, printResultTable } from "../view/Outputview.js";
import LottoStoreBox from "./LottoStoreBox.js";

class LottoResultModal {
  static #lottoResultBoard = {};
  static #$resultModal = document.getElementById("resultModal");

  static open(lottos, winningInfo) {
    const lottoResult = new LottoResult(getLottoRules());
    this.#lottoResultBoard = lottoResult.generateResultBoard(
      lottos,
      winningInfo
    );
    const results = this.#makeResultTable();
    const returnRate = lottoResult.calculateReturnRate(lottos.length * 1000);

    printResultTable(results);
    printReturnRate(returnRate);

    this.#$resultModal.classList.remove("hidden");
  }

  static close() {
    this.#$resultModal.classList.add("hidden");
    const $basicTh = this.#$resultModal.getElementsByTagName("th");
    document.getElementById("resultTable").replaceChildren(...$basicTh);
  }

  static #makeResultTable() {
    return Object.keys(LOTTO_RANK_CONDITION).map((rank) => {
      const $row = document.createElement("tr");

      const useBonus = LOTTO_RANK_CONDITION[rank].useBonusNumber;
      const matchedCondition = document.createElement("td");
      matchedCondition.innerText = useBonus
        ? `${LOTTO_RANK_CONDITION[rank].matchedCount}개+보너스볼`
        : `${LOTTO_RANK_CONDITION[rank].matchedCount}개`;

      const reward = document.createElement("td");
      reward.innerText = LOTTO_REWARDS[rank].toLocaleString();

      const resultCount = document.createElement("td");
      resultCount.innerText = this.#lottoResultBoard[rank];

      $row.append(matchedCondition, reward, resultCount);
      return $row;
    });
  }

  static #addClickCloseButtonEvent() {
    addEvent({
      target: this.#$resultModal.getElementsByClassName("closeButton")[0],
      eventType: "click",
      callback: () => {
        this.close();
      },
    });
  }

  static #addClickModalBackgroundEvent() {
    addEvent({
      target: this.#$resultModal.getElementsByClassName("modal-bg")[0],
      eventType: "click",
      callback: () => {
        this.close();
      },
    });
  }

  static #addClickRetryButtonEvent() {
    addEvent({
      target: this.#$resultModal.getElementsByClassName("retry")[0],
      eventType: "click",
      callback: () => {
        this.close();
        LottoStoreBox.init();
      },
    });
  }

  static addClickEvents() {
    this.#addClickCloseButtonEvent();
    this.#addClickModalBackgroundEvent();
    this.#addClickRetryButtonEvent();
  }
}

export default LottoResultModal;
