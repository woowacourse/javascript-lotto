import createDomElement from '../../../../../../utils/createDomElement';
import { PRIZE_WEB_MESSAGES } from '../../../../../../view/constants';

const $content = (key, value) => {
  const rankResultContent = createDomElement('div', {
    className: 'rank_result_box',
  });

  [PRIZE_WEB_MESSAGES[key], value.price.toLocaleString(), value.count].forEach(
    (info) => {
      const rankResultContentText = createDomElement('span', {
        textContent: info,
      });
      rankResultContent.appendChild(rankResultContentText);
    },
  );

  return rankResultContent;
};

export default $content;
