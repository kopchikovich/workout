import './message.css'

const makeMessage = (text, color) => {

    const message = document.createElement('div');
    message.className = 'message';
    message.innerHTML = text;
    message.style.color = color;
    
    return message;
}

export default makeMessage