
import gui from 'nw.gui'

const win = gui.Window.get()

export function showDevTools() {
  win.showDevTools()
}

export function reloadWindow() {
  win.reload()
}

export function closeWindow() {
  win.close()
}

export function openWindow(url, opt) {
  return gui.Window.open(url, {
    frame: true,
    toobar: false,
    focus: true,
    show: true,
    ...opt,
  })
}

export function openLogin() {
  openWindow('./index.html#/login', {
    title: 'Login',
    width: 400,
    height: 600,
  })
}

export function openHome() {
  openWindow('./index.html#/home', {
    title: 'Home',
    width: 1000,
    height: 600,
  })
}
