const getElementById = (id) => document.getElementById(id);
const BUTTONS = {
  price: getElementById("main-contents__price-button"),
  winningLotto: getElementById("main-contents__winning-lotto-button"),
  modalClose: getElementById("modal__close-button"),
  modalRetry: getElementById("modal__retry-button"),
};

const INPUTS = {
  price: getElementById("main-contents__price-input"),
  winningNumbers: Array.from(
    document.querySelectorAll(
      "#main-contents__winning-number-inputs .winning-number-input"
    )
  ),

  bonusNumber: document.querySelector(
    "#main-contents__bonus-number-div .winning-number-input"
  ),
};

const SPANS = {
  purchasedLotto: getElementById("main-contents__purchased-lotto-span"),
};

const DIVS = {
  purchasedLotto: getElementById("main-contents__purchased-lotto-div"),
  modal: getElementById("modal"),
};

const FORMS = {
  winningLotto: getElementById("main-contents__winning-lotto-form"),
};

const Elements = { BUTTONS, INPUTS, SPANS, DIVS, FORMS };

export default Elements;
