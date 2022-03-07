function comma(str) {
  return String(str).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
  return String(str).replace(/[^\d]+/g, '');
}

function insertAutoComma(obj) {
  obj.value = comma(uncomma(obj.value));
}

export default insertAutoComma;

export const insertComma = (original) => {
  return original.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
