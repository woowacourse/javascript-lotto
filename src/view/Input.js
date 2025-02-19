import { readLineAsync } from "../utils/readLineAsync.js";

export default class Input {
  static async getInput(message) {
    return await readLineAsync(message);
  }
}
