
import gui from 'nw.gui'

const win = gui.Window.get()

export { gui, win }

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
    toolbar: false,
    // focus: true,
    show: false, // 加载就绪才显示
    ...opt,
  })
}

export function openLogin() {
  const win = openWindow('./index.html#/login', {
    title: 'Login',
    width: 400,
    height: 600,
  })
  global.wins.login = win
}

export function openHome() {
  const win = openWindow('./index.html#/home', {
    title: 'Home',
    width: 900,
    height: 600,
  })
  global.wins.home = win
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

