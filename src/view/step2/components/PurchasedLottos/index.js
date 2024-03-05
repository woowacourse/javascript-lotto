import "./style.css";

class PurchasedLottos {
  #$parent;
  #props;

  constructor($parent, props) {
    this.#$parent = $parent;
    this.#props = props;
  }

  render() {
    const $oldPurchasedLottos =
      this.#$parent.querySelector("#purchased-lottos");
    if ($oldPurchasedLottos) {
      return;
    }

    const $newPurchasedLottos = this.#generatePurchasedLottos();
    this.#$parent.append($newPurchasedLottos);
  }

  #generatePurchasedLottos() {
    const $purchasedLottos = document.createElement("div");
    $purchasedLottos.id = "purchased-lottos";
    $purchasedLottos.className = "purchased-lottos";

    const $title = document.createElement("h3");
    $title.innerText = `총 ${this.#props.lottos.length}개를 구매하였습니다.`;

    const $content = document.createElement("div");
    $content.className = "purchased-lottos__content";
    $content.append(...this.#generateContentLottos());

    $purchasedLottos.append($title, $content);

    return $purchasedLottos;
  }

  #generateContentLottos() {
    const $lottos = this.#props.lottos.map((lotto) => {
      const $contentItem = document.createElement("div");

      const $emoji = document.createElement("span");
      $emoji.className = "purchased-lottos__content__item__emoji";
      $emoji.innerText = "🎟️";

      const $numbers = document.createElement("span");
      $numbers.innerText = lotto.numbers.sort((a, b) => a - b).join(", ");

      $contentItem.append($emoji, $numbers);

      return $contentItem;
    });

    return $lottos;
  }
}

export default PurchasedLottos;
