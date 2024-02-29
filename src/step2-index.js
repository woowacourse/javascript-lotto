import "../style.css";

const initBody = () => {
  preventDefaults(document.getElementsByTagName("button"), "click");
  // grantHiddenVisibilityClass(
  //   document.getElementById("main-contents__purchased-lotto-span")
  // );
  // grantHiddenVisibilityClass(
  //   document.getElementById("main-contents__purchased-lotto-box")
  // );
  grantHiddenVisibilityClass(
    document.getElementById("main-contents__winning-lotto-form")
  );
  grantHiddenVisibilityClass(document.getElementById("modal"));
};

const grantHiddenVisibilityClass = (element) => {
  element.classList.add("visibility-hidden");
};
const deactivateButtonClass = (element) => {
  element.classList.add("unavailable_button");
  element.classList.remove("available_button");
};

const activateButtonClass = (element) => {
  element.classList.add("available_button");
  element.classList.remove("unavailable_button");
};

const preventDefaults = (elements, eventType) =>
  Array.from(elements).forEach((element) => {
    deactivateButtonClass(element);
    element.addEventListener(eventType, preventDefault);
  });

const preventDefault = (event) => {
  event.preventDefault();
};

const priceButtonClickEvent = (event) => {
  preventDefault(event);
  deactivateButtonClass(event.target);

  document.getElementById("main-contents__price-input").value = "";
  deactivatePriceButton(event.target);
  console.log(document.getElementById("main-contents__price-input").value);
};

const activatePriceButton = () => {
  const priceButton = document.getElementById("main-contents__price-button");
  activateButtonClass(priceButton);
  priceButton.removeEventListener("click", preventDefault);

  priceButton.addEventListener("click", priceButtonClickEvent);
};

const deactivatePriceButton = (element) => {
  deactivateButtonClass(element);
  element.removeEventListener("click", priceButtonClickEvent);
  element.addEventListener("click", preventDefault);
};

initBody();
// activatePriceButton();
