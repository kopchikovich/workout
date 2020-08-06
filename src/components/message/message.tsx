import './message.css'

const makeMessage = (text: string, color: string): HTMLElement => {
  const message: HTMLElement = document.createElement('div')
  const renderColor: string = color === 'green'? '#0a0' : '#a00'

  message.className = 'message'
  message.innerHTML = text
  message.style.color = renderColor

  return message
}

export default makeMessage