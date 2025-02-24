import "./lottoNumbersBox.css";

const createLottoNumbersBox = (lottoNumbers) => {
  const gameBox = document.getElementsByClassName("gameBox-container")[0];
  const ul = document.createElement("ul");
  ul.className = "lotto-numbers-container";

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
    gameBox.appendChild(ul);
  });
};

export default createLottoNumbersBox;
