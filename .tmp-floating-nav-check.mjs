import { spawn } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

const browser = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--hide-scrollbars',
  '--remote-debugging-port=9226',
  `--user-data-dir=${path.resolve('.tmp-floating-nav-profile')}`,
  'about:blank',
], { stdio: 'ignore' })
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
let socket

try {
  let tab
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      tab = (await (await fetch('http://127.0.0.1:9226/json/list')).json()).find((item) => item.type === 'page')
      if (tab) break
    } catch { /* Browser is starting. */ }
    await pause(200)
  }
  if (!tab) throw new Error('Browser did not start')

  socket = new WebSocket(tab.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true })
    socket.addEventListener('error', reject, { once: true })
  })
  const pending = new Map()
  let id = 0
  socket.addEventListener('message', (event) => {
    const result = JSON.parse(event.data)
    if (!pending.has(result.id)) return
    const { resolve, reject } = pending.get(result.id)
    pending.delete(result.id)
    result.error ? reject(new Error(result.error.message)) : resolve(result.result)
  })
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const requestId = ++id
    pending.set(requestId, { resolve, reject })
    socket.send(JSON.stringify({ id: requestId, method, params }))
  })
  const evaluate = async (expression) => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true })
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text)
    return result.result?.value
  }

  await send('Page.enable')
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
  await send('Page.navigate', { url: 'http://127.0.0.1:5173/' })
  await pause(700)
  const top = await evaluate('document.querySelector(".floating-nav").classList.contains("floating-nav--visible")')
  await evaluate('window.scrollTo(0, 500)')
  await pause(550)
  const scrolled = await evaluate('document.querySelector(".floating-nav").classList.contains("floating-nav--visible")')
  const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
  await writeFile('.tmp-floating-nav-desktop.png', Buffer.from(data, 'base64'))
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
  await pause(300)
  const mobileDisplay = await evaluate('getComputedStyle(document.querySelector(".floating-nav")).display')
  console.log(JSON.stringify({ top, scrolled, mobileDisplay }))
  if (top || !scrolled || mobileDisplay !== 'none') process.exitCode = 1
} finally {
  socket?.close()
  browser.kill()
}
