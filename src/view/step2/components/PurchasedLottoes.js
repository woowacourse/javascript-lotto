class PurchasedLottoes {
  #props;

  constructor({ props }) {
    this.#props = props;
  }

  render() {
    if (!this.#props.lottoes) {
      return "";
    }

    const $root = document.createElement("div");
    $root.className = "purchased-lottoes";

    const $title = document.createElement("h3");
    $title.innerText = `총 ${this.#props.lottoes.length}개를 구매하였습니다.`;

    const $content = document.createElement("div");
    $content.className = "purchased-lottoes__content";

    const $lottoes = this.#props.lottoes.map((lotto) => {
      const $contentItem = document.createElement("div");

      const $emoji = document.createElement("span");
      $emoji.className = "purchased-lottoes__content__item__emoji";
      $emoji.innerText = "🎟️";

      const $numbers = document.createElement("span");
      $numbers.innerText = lotto.numbers.join(", ");

      $contentItem.append($emoji, $numbers);

      return $contentItem;
    });

    $content.append(...$lottoes);

    $root.append($title, $content);

    return $root;
  }
}

export default PurchasedLottoes;
