// 🔹 스크롤 방지 함수
const lockScroll = () => {
  const body = document.body;
  body.style.overflow = 'hidden';
};

// 🔹 스크롤 해제 함수
const unlockScroll = () => {
  const body = document.body;
  body.style.overflow = 'auto';
};

export { lockScroll, unlockScroll };
