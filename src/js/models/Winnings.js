import { RANK } from '../utils/constants/settings.js'
export default class Winnings {
  constructor() {
    this.initValue();
  }

  initValue() {
    this[RANK.FIRST] = 0;
    this[RANK.SECOND] = 0;
    this[RANK.THIRD] = 0;
    this[RANK.FOURTH] = 0;
    this[RANK.FIFTH] = 0;
  }
}
