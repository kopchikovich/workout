import makeMessage from '../../components/message/message'

export default function(text: string, color: string): void {
  const TOP_POSITION: string = '0'
  const TIMEOUT: number = 3000
  const container: HTMLElement | null = document.getElementById('message')
  const message: HTMLElement = makeMessage(text, color)

  if (container) {
    container.appendChild(message)
    // for animation
    setTimeout(() => {
      message.style.top = TOP_POSITION
    }, 100)
    setTimeout(() => {
      container.removeChild(message)
    }, TIMEOUT)
  }
}