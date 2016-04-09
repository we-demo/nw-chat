
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
  opt = {
    frame: true,
    toolbar: false,
    // focus: true,
    show: false, // 加载就绪才显示
    ...opt,
  }
  if (process.env.NW_AUTO_NOFOCUS === '1') {
    opt.focus = false
  }
  if (process.env.NW_AUTO_NOSHOW === '1') {
    // opt.show = false
    opt.x = opt.y = -99999 // 看不见的地方
  }
  const win = gui.Window.open(url, opt)
  if (process.env.NW_AUTO_NOFOCUS === '1') {
    win.focus = () => {}
  }
  if (process.env.NW_AUTO_NOSHOW === '1') {
    // win.show = () => {} // 会影响登录 而且已不必要
  }
  return win
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

