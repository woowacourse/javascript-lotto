const setPurchaseDetailVisibility = (state) => {
  const purchaseDetail = document.querySelector(".purchaseDetail");
  purchaseDetail.style.display = state === "on" ? "flex" : "none";
};

export default setPurchaseDetailVisibility;
