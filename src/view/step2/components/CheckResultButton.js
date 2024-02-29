class CheckResultButton {
  #props;

  constructor({ props }) {
    this.#props = props;
  }

  render() {
    if (!this.#props.isPurchased) {
      return "";
    }

    const $button = document.createElement("button");
    $button.className = "button--primary";
    $button.innerText = "결과 확인하기";

    return $button;
  }
}

export default CheckResultButton;
