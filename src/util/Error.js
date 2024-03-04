const Error = {
    showMessage(selector, error){
        const errorDiv = document.querySelector(selector);
        errorDiv.innerText = error.message;
    },

    closeMessage(selector) {
        const errorDiv = document.querySelector(selector);
        errorDiv.innerText = '';
    },
    
    checkMessage(selector){
        const errorDiv = document.querySelector(selector);
        if(errorDiv.textContent.includes('ERROR')){
            this.closeMessage(selector);
        }
    }
}

export default Error;
