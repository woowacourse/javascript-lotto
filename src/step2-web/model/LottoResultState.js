import { LOTTO_RANK_INITIAL_RESULT } from "../../step1-console/constants/lotto.js";
import MyState from "../abstract/MyState.js";

const createInitialLottoResult = () => ({
  rankResult: { ...LOTTO_RANK_INITIAL_RESULT },
  profitRate: 0,
  isResultModalOn: false,
});

export default class LottoResultState extends MyState {
  constructor(intialState = createInitialLottoResult()) {
    super(intialState);
  }
}
