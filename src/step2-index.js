import $lottoHeader from './components/lottoHeader.js';
import LottoMachine from './domain/model/LottoMachine.js';
import LottoStatistics from './domain/model/LottoStatistics.js';

const $createLottoHeader = () => $lottoHeader();

const lottoStart = () => {
  const lottoMachine = new LottoMachine();
  const lottoStatistics = new LottoStatistics();

  const lottoContainer = document.getElementById('lottoContainer');

  lottoContainer.appendChild($createLottoHeader());
};

lottoStart();
