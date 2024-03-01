import './TitleSection.css';
import Component from '../core/Component';
import { DOM_MESSAGE } from '../../constants/message';

class TitleSection extends Component {
  template() {
    return `<div class='title'>${DOM_MESSAGE.LOTTO_TITLE}</div>`;
  }
}

export default TitleSection;
