class ConsoleImplementation {
  static #queue = [];

  static #nowResolve = null;

  static enqueue(...args) {
    this.#validateEnqueueArgs(args);
    const stringArgs = args.map((arg) => arg.toString());
    if (this.#nowResolve !== null) {
      this.#executeResolve(stringArgs.shift());
    }
    this.#queue.push(...stringArgs);
  }

  static waitReading(resolve) {
    if (this.#nowResolve !== null) {
      throw new Error("[ERROR] 이미 대기 중인 resolve 함수가 존재");
    }
    if (this.#queue.length > 0) {
      resolve(this.#queue.shift());
      return;
    }
    this.#nowResolve = resolve;
  }

  static #validateEnqueueArgs(array) {
    const hasTostring = (element) => element.toString !== undefined;
    const returnStringByToString = (element) =>
      typeof element.toString() === "string";
    array.forEach((element) => {
      if (!hasTostring(element) || !returnStringByToString(element)) {
        throw new Error("[ERROR] 문자열로 변환할 수 없는 값이 들어옴");
      }
    });
  }

  static #executeResolve(strings) {
    this.#nowResolve(strings);
    this.#nowResolve = null;
  }
}

export default ConsoleImplementation;
