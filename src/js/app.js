import LottoView from './view/lottoView';

import RequestHandler from './requestHandler';
import LottoMachine from './machine/lottoMachine';

const lottoApp = () => {
  const lottoView = new LottoView();
  const lottoMachine = new LottoMachine();

  const requestHandler = new RequestHandler(lottoView, lottoMachine);

  lottoView.addRequestHandler(requestHandler.sendRequest);
};

export default lottoApp;
