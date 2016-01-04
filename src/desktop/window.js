
import gui from 'nw.gui'

export const win = gui.Window.get()

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
    width: 900,
    height: 600,
  })
}


// 解决: Cut/Copy/Paste hotkeys doesn't work on Mac
// https://github.com/nwjs/nw.js/issues/1955
export function fixMacMenu() {
  if (process.platform === 'darwin') {
    const mb = new gui.Menu({ type: 'menubar' })
    mb.createMacBuiltin('RoboPaint', {
      hideEdit: false,
      hideWindow: true,
    })
    gui.Window.get().menu = mb
  }
}

