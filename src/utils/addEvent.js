const addEvent = ({ name, eventType, callback }) => {
  const element = document.querySelector(name);
  element.addEventListener(eventType, callback);
};

export default addEvent;
