import { LOTTO_SETTING } from '../constants/setting';
import { getListDuplicateCount } from '../utils/data-manager';
import LottosModel from '../models/LottosModel';

const winningNumberList = [1, 2, 3, 4, 5, 6];
const bonusNumber = 7;

function getRankNumber(lottoNumberList) {}

it('일치하는 로또 번호가 3개일 때 5등이 되어야 한다.', () => {
  const lottoNumberList = [1, 2, 3, 10, 11, 12];
});

it('일치하는 로또 번호가 4개일 때 4등이 되어야 한다.', () => {
  const lottoNumberList = [1, 2, 3, 4, 11, 12];
});

it('일치하는 로또 번호가 5개일 때 3등이 되어야 한다.', () => {
  const lottoNumberList = [1, 2, 3, 4, 5, 12];
});

it('일치하는 로또 번호가 5개이고, 보너스 번호가 동일할 때 2등이 되어야 한다.', () => {
  const lottoNumberList = [1, 2, 3, 4, 5, 7];
});

it('일치하는 로또 번호가 6개일 때 1등이 되어야 한다.', () => {
  const lottoNumberList = [1, 2, 3, 4, 5, 6];
});
