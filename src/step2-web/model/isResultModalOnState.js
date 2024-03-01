import MyState from "../abstract/MyState.js";

export default class IsResultModalOnState extends MyState {
  constructor(initialState = false) {
    super(initialState);
  }
}
