/** 비즈니스 로직을 담은 클래스가 여러 개여도 모든 핸들러는 이 객체로 들어오게됩니다. */
/** 여러 화면에서 사용되는 핸들러가 있다면 하나의 객체에 담아두고 필요할 때 쓰도록 하였습니다. */
/** singleton */
export const { setListener, emitListener, removeListener } = (function () {
  const eventListeners = {};

  return {
    setListener: (eventName, eventListener) => {
      eventListeners[eventName] = eventListener;
    },
    emitListener: (eventName, e) => {
      const eventListener = eventListeners[eventName];
      eventListener(e);
    },
    removeListener: (eventName) => {
      delete eventListeners[eventName];
    },
  };
})();
