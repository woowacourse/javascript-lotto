class FrozenMap extends Map {
  #isFrozen;

  constructor(entries) {
    super();
    this.#isFrozen = false;

    if (!entries) {
      // 생성자에 인자(초기 값)가 없는 경우
      return;
    }

    // 생성자에 인자(초기 값)가 있는 경우
    for (const [key, value] of entries) {
      super.set(key, value);
    }

    this.#isFrozen = true;
  }

  freeze() {
    this.#isFrozen = true;
  }

  getIsFrozen() {
    return this.#isFrozen;
  }

  set(key, value) {
    if (this.#isFrozen) {
      throw new Error("Freeze 상태에서는 set 메서드를 사용할 수 없습니다.");
    }

    super.set(key, value);
  }

  delete() {
    throw new Error("Frozen Map객체는 delete 메서드를 사용할 수 없습니다.");
  }

  clear() {
    throw new Error("Frozen Map객체는 clear 메서드를 사용할 수 없습니다.");
  }
}

export default FrozenMap;
