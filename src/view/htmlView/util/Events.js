import Elements from "./Elements";

class Events {
  static priceButtonClickEvent(event) {
    event.preventDefault();
    const priceInput = Elements.INPUTS.price;

    console.log(priceInput.value);
  }

  static winningLottoButtonClickEvent(event) {
    event.preventDefault();
    const winningNumbers = Elements.INPUTS.winningNumbers
      .map((element) => element.value)
      .join(",");

    const bonusNumber = Elements.INPUTS.bonusNumber.value;

    console.log(winningNumbers, bonusNumber);
  }

  static modalRetryButtonClickEvent(event) {
    event.preventDefault();
    console.log("y");
  }

  static modalCloseButtonClickEvent(event) {
    event.preventDefault();
    console.log("n");
  }

  static preventDefault(event) {
    event.preventDefault();
  }
}

export default Events;
