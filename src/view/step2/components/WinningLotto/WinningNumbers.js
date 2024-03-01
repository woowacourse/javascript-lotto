class WinningNumbers {
  #$parent;
  #props;

  constructor($parent, props) {
    this.#$parent = $parent;
    this.#props = props;
  }

  render() {
    const $oldWinningNumbers = this.#$parent.querySelector("#winning-numbers");
    const $newWinningNumbers = this.#generateWinningNumbers();

    if ($oldWinningNumbers) {
      this.#$parent.replaceChild($newWinningNumbers, $oldWinningNumbers);
      return;
    }

    this.#$parent.append($newWinningNumbers);
  }

  #generateWinningNumbers() {
    const $winningNumbers = document.createElement("div");
    $winningNumbers.id = "winning-numbers";
    $winningNumbers.className = "winning-lotto__content__winning-numbers";

    const $title = document.createElement("h4");
    $title.innerText = "당첨 번호";

    const $content = this.#generateWinningNumbersContent();

    $winningNumbers.append($title, $content);

    return $winningNumbers;
  }

  #generateWinningNumbersContent() {
    const $content = document.createElement("div");
    $content.className = "winning-lotto__input-wrapper";
    $content.addEventListener("input", (e) => {
      this.#props.winningNumbers[e.target.dataset.index] = e.target.value;
    });

    $content.append(...this.#generateWinningNumbersContentInput());

    return $content;
  }

  #generateWinningNumbersContentInput() {
    return this.#props.winningNumbers.map((_, index) => {
      const $input = document.createElement("input");
      $input.className = "input winning-lotto__input";
      $input.type = "text";
      $input.dataset.index = index;

      return $input;
    });
  }
}

export default WinningNumbers;
