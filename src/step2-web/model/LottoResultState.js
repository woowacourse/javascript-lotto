import { LOTTO_RANK_INITIAL_RESULT } from "../../step1-console/constants/lotto.js";
import State from "../abstract/State.js";

export default class LottoResultState extends State {
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
