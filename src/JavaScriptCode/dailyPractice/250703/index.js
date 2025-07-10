class EventEmitter {
  constructor() {
    this.events = {};//缺点：原型链上的属性会被监听，建议 Object.create(null)，或者使用 Map
  }
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return () => this.off(event, listener);
  }
  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(l => l !== listener);
  }
  emit(event, ...args) {
    if (!this.events[event]) return false;
    this.events[event].forEach(listener => listener(...args));
    return true;
  }
}
const emitter = new EventEmitter();
const unsubscribe = emitter.on('message', data => console.log(data));
emitter.emit('message', 'Hello');
emitter.emit('message', 'World');
unsubscribe();
emitter.emit('message', 'Ignored');
console.log(emitter.emit('message', 'Still ignored'));

// 使用