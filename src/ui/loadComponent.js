const resolvePath = (path) => new URL(path, document.baseURI).href;

const loadComponent = (id, path) => {
  return fetch(path)
    .then((response) => response.text())
    .then((data) => {
      const nodeElement = document.getElementById(id);
      nodeElement.insertAdjacentHTML("beforeend", data);
      return loadNestedComponents(nodeElement);
    })
    .catch((error) => console.error(`컴포넌트 로드 실패: ${path}`, error));
};

const loadNestedComponents = (root) => {
  const targetComponents = root.querySelectorAll("[data-component]");
  const promises = [...targetComponents].map((element) => {
    const elementPath = resolvePath(element.dataset.component);
    element.removeAttribute("data-component");
    return fetch(elementPath)
      .then((response) => response.text())
      .then((html) => {
        element.insertAdjacentHTML("beforeend", html);
        return loadNestedComponents(element);
      })
      .catch((error) =>
        console.error(`컴포넌트 로드 실패: ${elementPath}`, error),
      );
  });
  return Promise.all(promises);
};

export default loadComponent;
