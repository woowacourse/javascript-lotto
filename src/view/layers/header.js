import "./header.css"

const createHeader = async () => {
  const contents = await fetch("/header.html");
  const parsedContents = await contents.text();

  const header = document.createElement("header");
  header.className = `header-container`;
  header.innerHTML = parsedContents;

  document.getElementById("app").prepend(header);
};

export default createHeader;
