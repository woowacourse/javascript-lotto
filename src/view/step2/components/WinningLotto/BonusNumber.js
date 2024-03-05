class BonusNumber {
  #$parent;
  #props;

  constructor($parent, props) {
    this.#$parent = $parent;
    this.#props = props;
  }

  render() {
    const $oldBonusNumber = this.#$parent.querySelector("#bonus-number");
    if ($oldBonusNumber) {
      return;
    }

    const $newBonusNumber = this.#generateBonusNumber();
    this.#$parent.append($newBonusNumber);
  }

  #generateBonusNumber() {
    const $bonusNumber = document.createElement("div");
    $bonusNumber.id = "bonus-number";
    $bonusNumber.className = "winning-lotto__content__bonus-number";

    const $title = document.createElement("h4");
    $title.innerText = "보너스 번호";

    const $input = document.createElement("input");
    $input.className = "input winning-lotto__input";
    $input.type = "text";
    $input.addEventListener("input", (e) => {
      this.#props.setBonusNumber(e.target.value);
    });

    $bonusNumber.append($title, $input);

    return $bonusNumber;
  }
}

export default BonusNumber;
