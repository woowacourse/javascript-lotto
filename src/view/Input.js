import { readLineAsync } from "../utils/readLineAsync";

export default class Input {
  static async getInput(message) {
    return await readLineAsync(message);
  }
}
