import "./style.css";

class PurchasedLottoes {
  #$parent;
  #props;

  constructor($parent, props) {
    this.#$parent = $parent;
    this.#props = props;
  }

  render() {
    if (!this.#props.lottoes) {
      return "";
    }

    const $oldPurchasedLottoes =
      this.#$parent.querySelector("#purchased-lottoes");
    const $newPurchasedLottoes = this.#generatePurchasedLottoes();

    if ($oldPurchasedLottoes) {
      this.#$parent.replaceChild($newPurchasedLottoes, $oldPurchasedLottoes);
      return;
    }

    this.#$parent.append($newPurchasedLottoes);
  }

  #generatePurchasedLottoes() {
    const $purchasedLottoes = document.createElement("div");
    $purchasedLottoes.id = "purchased-lottoes";
    $purchasedLottoes.className = "purchased-lottoes";

    const $title = document.createElement("h3");
    $title.innerText = `총 ${this.#props.lottoes.length}개를 구매하였습니다.`;

    const $content = document.createElement("div");
    $content.className = "purchased-lottoes__content";
    $content.append(...this.#generateContentLottoes());

    $purchasedLottoes.append($title, $content);

    return $purchasedLottoes;
  }

  #generateContentLottoes() {
    const $lottoes = this.#props.lottoes.map((lotto) => {
      const $contentItem = document.createElement("div");

      const $emoji = document.createElement("span");
      $emoji.className = "purchased-lottoes__content__item__emoji";
      $emoji.innerText = "🎟️";

      const $numbers = document.createElement("span");
      $numbers.innerText = lotto.numbers.sort((a, b) => a - b).join(", ");

      $contentItem.append($emoji, $numbers);

      return $contentItem;
    });

    return $lottoes;
  }
}

export default PurchasedLottoes;
