function comma(str) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
  str = String(str);
  return str.replace(/[^\d]+/g, '');
}

function insertAutoComma(obj) {
  obj.value = comma(uncomma(obj.value));
}

export default insertAutoComma;
