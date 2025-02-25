const showLottos = (count) => {
  const whenBuyed = document.querySelector(".whenBuyed");
  const buyedLottos = document.querySelector(".buyedLottos");
  const text = buyedLottos.querySelector(".text");

  whenBuyed.style.display = "block";
  text.textContent = `총 ${count}개를 구매했습니다.`;
  console.log("개수", count);
};

export default showLottos;
