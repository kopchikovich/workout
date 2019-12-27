import './message.css'

const makeMessage = (text, color) => {

    const message = document.createElement('div');
    const renderColor = color === 'green'? '#0a0' : '#a00';

    message.className = 'message';
    message.innerHTML = text;
    message.style.color = renderColor;
    
    return message;
}

export default makeMessage