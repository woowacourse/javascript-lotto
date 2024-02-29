class WinningNumbers {
  render() {
    const $root = document.createElement("div");
    $root.className = "winning-lotto__content__winning-numbers";

    const $title = document.createElement("h4");
    $title.innerText = "당첨 번호";

    const $content = document.createElement("div");

    const $numberInputs = Array.from({ length: 6 }).map(() => {
      const $input = document.createElement("input");
      $input.className = "input winning-lotto__input";
      $input.type = "text";

      return $input;
    });

    $content.append(...$numberInputs);

    $root.append($title, $content);

    return $root;
  }
}

export default WinningNumbers;
