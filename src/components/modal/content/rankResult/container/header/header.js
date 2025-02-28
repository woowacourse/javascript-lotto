import createDomElement from '../../../../../../utils/createDomElement';

const $header = () => {
  const headerBox = ['일치 갯수', '당첨금', '당첨 갯수'].map((text) => {
    const header = createDomElement('b', {
      textContent: text,
    });

    return header;
  });
  return headerBox;
};

export default $header;
