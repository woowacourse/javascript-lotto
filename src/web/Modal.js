const Modal = {
    createModal(){
        const modalPosition = document.querySelector('.modal');
        console.log(modalPosition)
        modalPosition.innerHTML = this.createModalContainer()
    },

    createModalContainer() {
        return`
        <div class = 'modal-container'>
            <div class = 'modal-contents'>
            <p class='modal-title'>🏆 당첨 통계 🏆</p>
            </div>
        </div>
        `
    }
}
export default Modal;