const createLottoNumbersList = (lottoNumbers) => {
  const ul = document.createElement("ul");
  ul.className = "lotto-list";

  lottoNumbers.forEach((numbers, index) => {
    const li = document.createElement("li");
    li.className = "lotto-numbers";
    li.id = `lotto-numbers-${index}`;

    const span = document.createElement("span");
    span.className = "lotto-icon";
    span.id = `lotto-icon-${index}`;
    span.append("🎟️");

    const textNode = document.createTextNode(numbers.join(", "));

    li.appendChild(span);
    li.appendChild(textNode);
    ul.appendChild(li);

    document.getElementById("lotto-container").appendChild(ul);
  });
};

export default createLottoNumbersList;
