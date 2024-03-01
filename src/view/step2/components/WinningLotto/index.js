import "./style.css";
import WinningNumbers from "./WinningNumbers";
import BonusNumber from "./BonusNumber";

class WinningLotto {
  #$parent;
  #props;

  constructor($parent, props) {
    this.#$parent = $parent;
    this.#props = props;
  }

  render() {
    const $oldWinningLotto = this.#$parent.querySelector("#winning-lotto");
    const $newWinningLotto = this.#generateWinningLotto();

    if ($oldWinningLotto) {
      this.#$parent.replaceChild($newWinningLotto, $oldWinningLotto);
      return;
    }

    this.#$parent.append($newWinningLotto);
  }

  #generateWinningLotto() {
    const $winningLotto = document.createElement("div");
    $winningLotto.id = "winning-lotto";
    $winningLotto.className = "winning-lotto";

    const $title = document.createElement("h3");
    $title.innerText = "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.";

    const $content = this.#generateWinningLottoContent();

    $winningLotto.append($title, $content);

    return $winningLotto;
  }

  #generateWinningLottoContent() {
    const $content = document.createElement("div");
    $content.className = "winning-lotto__content";

    new WinningNumbers($content, {
      winningNumbers: this.#props.winningNumbers,
    }).render();
    new BonusNumber($content, {
      bonusNumber: this.#props.bonusNumber,
      setBonusNumber: this.#props.setBonusNumber,
    }).render();

    return $content;
  }
}

export default WinningLotto;
