import { LOTTO_SETTING } from '../constants/setting';

function shuffle(list) {
  list.sort(() => Math.random() - 0.5);
  return list;
}

export default class Lotto {
  // _는 protected 입니다.
  _lottoNumbers = [];

  generate() {
    const shuffledList = shuffle(
      [...Array(LOTTO_SETTING.MAX_RANDOM_NUMBER)].map((_, idx) => idx + 1)
    );
    this._lottoNumbers = shuffledList.slice(0, LOTTO_SETTING.LOTTO_NUMBER_LENGTH);

    return this;
  }

  get lottoNumbers() {
    return this._lottoNumbers;
  }
}
