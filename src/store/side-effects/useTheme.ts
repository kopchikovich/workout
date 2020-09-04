import cloudData from '../../data/CloudData'

export default function(darkTheme: boolean, isLogin: boolean): void {
  // 0 - dark theme, 1 - ligth theme
  const colors: any = {
    '--main-bg-color': ['#333', '#fff'],
    '--second-bg-color': ['#61dafb', '#f55'],
    '--main-text-color': ['#ddd', '#222'],
    '--second-text-color': ['#333', '#fff'],
    '--modal-bg-color': ['#666', '#ddd'],
    '--modal-text-color': ['#fff', '#111']
  }
  const root: any = document.querySelector('html')
  let themeIndex = 0
  if (darkTheme) {
    themeIndex = 0
  } else {
    themeIndex = 1
  }
  if (isLogin) {
    cloudData.user.update({ darkTheme })
        .then(() => cloudData.getUserData())
        .catch((e: any) => console.error(e))
    localStorage.setItem('dark-theme', JSON.stringify(darkTheme))
  }
  Object.keys(colors).forEach((color) => {
    root.style.setProperty(color, colors[color][themeIndex])
  })
}