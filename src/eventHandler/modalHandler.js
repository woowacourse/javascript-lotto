import domRefs from "../webView/dom.js";

domRefs.$modalCloseButton.addEventListener("click", () => {
  domRefs.$modal.close();
});

domRefs.$modal.addEventListener("click", (e) => {
  if (e.target === domRefs.$modal) {
    domRefs.$modal.close();
  }
});
