import { LOTTO_RANK_INITIAL_RESULT } from "../../step1-console/constants/lotto.js";
import MyState from "../abstract/MyState.js";

export default class LottoResultState extends MyState {
  constructor(
    intialState = {
      rankResult: { ...LOTTO_RANK_INITIAL_RESULT },
      profitRate: 0,
      isResultModalOn: false,
    }
  ) {
    super(intialState);
  }
}
