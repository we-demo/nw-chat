
import gui from 'nw.gui'

const win = gui.Window.get()

export function openWindow(url, opt) {
  return gui.Window.open(url, opt)
}

export function closeWindow() {
  win.close()
}

export function showDevTools() {
  win.showDevTools()
}
