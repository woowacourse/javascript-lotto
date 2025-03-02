import domRefs from "../webView/dom.js";
import { disabled, initNode, initNodes } from "../util/webUtil.js";

domRefs.$modalRestartButton.addEventListener("click", () => {
  domRefs.$modal.close();
  domRefs.$lottoInfoWrap.style.display = "none";
  domRefs.$inputPrice.value = "";

  disabled([domRefs.$inputPrice, domRefs.$buyButton]);
  initNodes(domRefs.$paper_winning_number_inputs);
  initNode(domRefs.$paper_bonus_number_input);
  domRefs.$lottoInfo.innerHTML = "";

  domRefs.$inputPrice.focus();
});
