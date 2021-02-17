import { $, $$ } from "../Util/querySelector.js";

export const onPurchaseResultShow = () => {
  $("#receipt-container").classList.remove("hidden");
  $("#win-number-container").classList.remove("hidden");
};

export const onPurchaseResultHidden = () => {
  $("#receipt-container").classList.add("hidden");
  $("#win-number-container").classList.add("hidden");
};