import {
  CashContainer,
  IssueManagerContainer,
  LottoDetailContainer,
  WinningNumberContainer,
  Modal,
} from "./components/index.js";
import { notify } from "./utils/index.js";

try {
  CashContainer.init();
  IssueManagerContainer.init();
  LottoDetailContainer.init();
  WinningNumberContainer.init();
  Modal.init();
} catch (error) {
  console.error(error.message);
  notify("예상하지 못한 에러가 발생하였습니다. 관리자에게 문의해주세요. ");
}
