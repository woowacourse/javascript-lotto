import createDomElement from '../../../utils/createDomElement.js';
import $inputExplain from './inputExplain/inputExplain.js';
import $lottoInputTitle from './inputTitle/inputTitle.js';
import $lottoFormInputBox from './inputFormInputBox/inputFormInputBox.js';
import { PRIZE_TITLE } from '../../../view/constants.js';

const $lottoInputList = () => {
  const lottoInputList = createDomElement('div', {
    className: 'lotto_input_list',
  });

  lottoInputList.appendChild($inputExplain());
  lottoInputList.appendChild($lottoInputTitle(PRIZE_TITLE));
  lottoInputList.appendChild($lottoFormInputBox());

  return lottoInputList;
};
export default $lottoInputList;
