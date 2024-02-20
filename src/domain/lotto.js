export default class Lotto {
  constructor(numbers) {
    if (numbers.length !== 6) {
      throw new Error();
    }
  }
}
