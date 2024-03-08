import ElementActivator from "./class/ElementActivator";
import ClassName from "./util/ClassName";
import Elements from "./util/Elements";
import removeClass from "./util/removeClass";

class HTMLOutputView {
  static printNumberOfLotto(numberOfLotto) {
    const purchasedLottoSpan = Elements.SPANS.purchasedLotto;

    removeClass(purchasedLottoSpan, ClassName.visibilityHidden);
    purchasedLottoSpan.innerHTML = "";
    purchasedLottoSpan.innerHTML = `총 ${numberOfLotto}개를 구매하였습니다.`;
  }

  static printBoughtLottos(lottos) {
    const lottoNumberElements = lottos.map((lotto) =>
      this.#getPurchasedLottoElement(lotto)
    );
    const purchasedLottodiv = Elements.SECTION.purchasedLotto;

    removeClass(purchasedLottodiv, ClassName.visibilityHidden);
    purchasedLottodiv.innerHTML = "";
    purchasedLottodiv.append(...lottoNumberElements);
  }

  static printBoughtSlicedLottos(lottos, originalNumberOfLotto) {
    HTMLOutputView.printBoughtLottos(lottos);

    const purchasedLottodiv = Elements.SECTION.purchasedLotto;
    purchasedLottodiv.append(
      this.#getPurchasedLottoElement([
        `기타 ${originalNumberOfLotto - lottos.length}개의 로또...`,
      ])
    );
  }

  static printLottoResultIntro() {
    ElementActivator.activateModal();
  }

  static printLottoResult(rankCounts, profitRate) {
    const transformIndexToRank = (index) => 5 - index;
    const rankCountElements = document.getElementsByClassName("rank-count");
    const rankCountElementArray = Array.from(rankCountElements);
    rankCountElementArray.forEach(
      (element, index) =>
        (element.innerText = `${rankCounts[transformIndexToRank(index)]}개`)
    );
    this.#printLottoProfitRate(profitRate);
  }

  static printBlankLine() {
    // LottoOutputController와의 호환을 위해 생성된 빈 함수
  }

  static #printLottoProfitRate(profitRate) {
    const resultSpan = document.getElementById("modal__result-span");
    resultSpan.innerText = `당신의 총 수익률은 ${profitRate.toFixed(
      1
    )}%입니다.`;
  }

  static #getPurchasedLottoElement = (lotto) => {
    const purchasedLottoElement = document.createElement("figure");
    purchasedLottoElement.classList.add(ClassName.purchasedLotto);
    purchasedLottoElement.appendChild(this.#getLottoTicketStrong());
    purchasedLottoElement.appendChild(this.#getLottoNumberSpan(lotto));
    return purchasedLottoElement;
  };

  static #getLottoTicketStrong = () => {
    const lottoTicketStrong = document.createElement("strong");
    lottoTicketStrong.innerHTML = "🎟️";
    lottoTicketStrong.classList.add(ClassName.lottoTicket);
    return lottoTicketStrong;
  };

  static #getLottoNumberSpan = (lotto) => {
    const lottoNumberSpan = document.createElement("span");
    lottoNumberSpan.innerHTML = lotto.sort((a, b) => a - b).join(", ");
    lottoNumberSpan.classList.add(ClassName.lottoNumber);
    return lottoNumberSpan;
  };
}

export default HTMLOutputView;
