import { $ } from "./Util/querySelector.js";
import {
  onLottoReceiptHidden,
  handlePurchaseMountSubmit,
} from "./Controller/controller.js";
const $purchaseMountSubmit = $("#purchase-mount-submit");

onLottoReceiptHidden();
$purchaseMountSubmit.addEventListener("click", handlePurchaseMountSubmit);
