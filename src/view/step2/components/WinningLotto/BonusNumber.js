class BonusNumber {
  render() {
    const $root = document.createElement("div");
    $root.className = "winning-lotto__content__bonus-number";

    const $title = document.createElement("h4");
    $title.innerText = "보너스 번호";

    const $input = document.createElement("input");
    $input.className = "input winning-lotto__input";
    $input.type = "text";

    $root.append($title, $input);

    return $root;
  }
}

export default BonusNumber;
