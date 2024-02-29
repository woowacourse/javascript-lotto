import WinningNumbers from "./WinningNumbers";
import BonusNumber from "./BonusNumber";

class WinningLotto {
  #props;
  #winningNumbers;
  #bonusNumber;

  constructor({ props }) {
    this.#props = props;
    this.#winningNumbers = new WinningNumbers();
    this.#bonusNumber = new BonusNumber();
  }

  render() {
    if (!this.#props.isPurchased) {
      return "";
    }

    const $root = document.createElement("div");
    $root.className = "winning-lotto";

    const $title = document.createElement("h3");
    $title.innerText = "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.";

    const $content = document.createElement("div");
    $content.className = "winning-lotto__content";
    $content.append(this.#winningNumbers.render(), this.#bonusNumber.render());

    $root.append($title, $content);

    return $root;
  }
}

export default WinningLotto;
