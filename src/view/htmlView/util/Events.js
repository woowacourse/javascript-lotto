import Elements from "./Elements";
import ConsoleImplementation from "../class/ConsoleImplementation";

class Events {
  static priceButtonClickEvent(event) {
    event.preventDefault();
    const priceInput = Elements.INPUTS.price;

    ConsoleImplementation.enqueue(priceInput.value);
  }

  static winningLottoButtonClickEvent(event) {
    event.preventDefault();
    const winningNumbers = Elements.INPUTS.winningNumbers
      .map((element) => element.value)
      .join(",");

    const bonusNumber = Elements.INPUTS.bonusNumber.value;

    ConsoleImplementation.enqueue(winningNumbers, bonusNumber);
  }

  static modalRetryButtonClickEvent(event) {
    event.preventDefault();
    ConsoleImplementation.enqueue("y");
  }

  static modalCloseButtonClickEvent(event) {
    event.preventDefault();
    ConsoleImplementation.enqueue("n");
  }

  static preventDefault(event) {
    event.preventDefault();
  }
}

export default Events;
