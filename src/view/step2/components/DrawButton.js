class DrawButton {
  #$parent;
  #props;

  constructor($parent, props) {
    this.#$parent = $parent;
    this.#props = props;
  }

  render() {
    const $oldDrawButton = this.#$parent.querySelector("#draw-button");
    if ($oldDrawButton) {
      return;
    }

    const $newDrawButton = this.#generateDrawButton();
    this.#$parent.append($newDrawButton);
  }

  #generateDrawButton() {
    const $drawButton = document.createElement("button");
    $drawButton.id = "draw-button";
    $drawButton.className = "button--primary";
    $drawButton.innerText = "결과 확인하기";
    $drawButton.addEventListener("click", this.#props.onDrawButtonClick);

    return $drawButton;
  }
}

export default DrawButton;
