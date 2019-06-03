import disposable from '../../../shared/disposable'
import evented from '../../evented'
import input from '../App.input'

let map

// Cancellable input method.
let inputMethod

const init = reference => (map = reference)

// FIXME: must become some sort of behavior
const pickPoint = options => {

  // Cancel active input (if any):
  if (inputMethod) inputMethod()

  const prompt = options.prompt || ''
  evented.emit('OSD_MESSAGE', { message: prompt })
  const container = map._container

  const click = event => {
    options.picked && options.picked(event.latlng)

    // Visual feedback:
    const message = options.message || ''
    evented.emit('OSD_MESSAGE', { message, duration: 1500 })
    const originalFilter = container.style.filter
    const reset = () => (container.style.filter = originalFilter)
    container.style.filter = 'invert(100%)'
    setTimeout(reset, 50)

    disposables.dispose()
  }

  const disposables = disposable.of({})
  disposables.addDisposable(() => (container.style.cursor = originalCursor))
  disposables.addDisposable(() => input.pop())

  const originalCursor = container.style.cursor
  container.style.cursor = 'crosshair'
  input.push({
    click: click,
    escape: disposables.dispose
  })

  inputMethod = disposables.dispose
}

export default {
  init,
  pickPoint
}
