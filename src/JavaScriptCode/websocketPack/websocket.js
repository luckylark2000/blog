
export default class WebsocketClient { 
  port = 6666
  host = '127.0.0.1'
  token = ''
  ws = null
  receivesMap = new Map()
  constructor(params={}) {
    const { host, port, token } = params
    this.host = host || this.host
    this.port = port || this.port
    this.token = token || this.token
    if (this.ws) {
      this.close()
    }
    this.create()
  }

  create() {
    this.ws = new WebSocket('ws://' + this.host + this.port + '/')
    this.onOpen()
    
  }
  onOpen() {
    this.ws.onopen = (e) => {
      console.log('WebSocket连接成功', e)
      this.onMessage()
    }
  }
  close() {
    this.ws.close()
    this.ws = null
    // 清空接收消息缓存池子
    this.receivesMap.clear()
  }
  /**
   * 发送消息
   * @param {*} message 降到发送到服务器的数据
   */
  send(message) {
    const data = JSON.stringify(message)
    this.ws.send(data)
  }
  reconnect() {
    this.ws.reconnect()
  }

  onMessage() {
    if(!this.ws) return
    this.ws.onmessage = (e) => {
      const res = JSON.parse(e.data)
      console.log('WebSocket接收到消息onMessage', res)
      if (res.errCode === 0) {
        this.receivesMap.get(res.id).resolve(res)
      } else {
        this.receivesMap.get(res.id).reject(res)
      }
      // 无论成功还是失败，把消息都从 map 缓存池中删除
      this.receivesMap.delete(res.id)
    }
  }

  /**
   * 有回调的 websocket 通信
   * @param name 方法名
   * @param callback 回调函数
   * @param args 参数
   */
  call(name, args = {}) {
    return new Promise((resolve, reject) => {

      const params = {}
      params.id = new Date().getTime()
      // 把回调函数存起来
      // if (typeof callback === 'function') {
      //   this.receivesMap.set(params.id, callback)
      // }
      this.receivesMap.set(params.id, { resolve,reject })
      
      params.name = name
      if (arguments.length > 2) {
        for (let key in args) {
          params[key] = args[key]
        }
      }
      console.log("传输的参数是：", params)
      console.log("消息池",this.receivesMap)

      this.send(params)
    })
  }
  call2(name, callback, args = {}) {

      const params = {}
      params.id = new Date().getTime()
      // 把回调函数存起来
      if (typeof callback === 'function') {
        this.receivesMap.set(params.id, callback)
      }
      params.name = name
      if (arguments.length > 2) {
        for (let key in args) {
          params[key] = args[key]
        }
      }
      console.log("传输的参数是：", params)
      console.log("消息池",this.receivesMap)

      this.send(params)
  }
    
  
}