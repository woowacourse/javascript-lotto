function shuffle(list) {
  list.sort(() => Math.random() - 0.5);
  return list;
}

export default class Lotto {
  // _는 protected 입니다.
  _lottoNumbers = [];

  generate() {
    const shuffledList = shuffle([...Array(45)].map((_, idx) => idx + 1));
    this._lottoNumbers = shuffledList.slice(0, 6);

    return this;
  }

  get lottoNumbers() {
    return this._lottoNumbers;
  }
}
