import { readLineAsync } from "../utils/readLineAsync.js";

export default class Input {
  static getInput(message) {
    return readLineAsync(message);
  }
}
