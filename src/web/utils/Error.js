const Error = {
    showMessage(selector, error){
        const errorDiv = document.querySelector(selector);
        errorDiv.innerText = error.message;
    },

    closeMessage(selector) {
        const errorDiv = document.querySelector(selector);
        errorDiv.innerText = '';
    },
}

export default Error;