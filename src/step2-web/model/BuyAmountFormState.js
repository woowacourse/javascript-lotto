import State from "../abstract/State.js";

export default class BuyAmountFormState extends State {
  constructor(
    initialState = {
      buyAmount: null,
      errorMessage: null,
    }
  ) {
    super(initialState);
  }
}
