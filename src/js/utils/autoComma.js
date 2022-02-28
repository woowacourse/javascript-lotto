const autoComma = (text) =>
  String(text).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');

export default autoComma;
