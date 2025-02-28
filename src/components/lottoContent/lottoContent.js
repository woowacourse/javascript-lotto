import createDomElement from '../../utils/createDomElement.js';
import $contentCountLabel from './countLabel/contentCountLabel.js';
import $lottoInputList from './inputList/inputList.js';
import $ticketContainer from './ticketContainer/contentTicketContainer.js';

const $createLottoContent = (lottos) => {
  const lottoContent = createDomElement('div', {
    className: 'lotto_result_list',
  });

  lottoContent.appendChild($contentCountLabel(lottos.length));
  lottoContent.appendChild($ticketContainer(lottos));
  lottoContent.appendChild($lottoInputList(lottos));

  return lottoContent;
};

export default $createLottoContent;
