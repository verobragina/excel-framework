export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // Уведомляет слушателей, если они есть
  // table.emit('table:select', {a: 1})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // Подписывается на уведомления
  // Добавляет нового слушателя
  // formula.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    // Отписывается от события
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
      // Нужно оставить в массиве всех слушателей,
      // чья функция не будет равна текущей функции
    }
  }
}

// Пример работы:
// emitter.subscribe('vero', data => console.log('Sub: ', data))
// emitter.emit('vero', 42)
