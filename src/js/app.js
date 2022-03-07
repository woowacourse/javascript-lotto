import LottoView from './view/lottoView';
import LottoMachine from './machine/lottoMachine';

import RequestHandler from './requestHandler';

const lottoApp = () => {
  const lottoView = new LottoView();
  const lottoMachine = new LottoMachine();

  const requestHandler = new RequestHandler(lottoView, lottoMachine);

  lottoView.addRequestHandler(requestHandler.sendRequest);
};

export default lottoApp;
