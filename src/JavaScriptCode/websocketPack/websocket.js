
export default class WebsocketClient { 
  port = 16088
  host = '127.0.0.1'
  token = ''
  ws = null
  receivesMap = new Map()
  isRetry = true // 是否开启接口自动重试
  maxAttempts = 3 // 单个接口最大获取数据次数
  timeout = 3000 // 单个接口超时时间
  retryInterval = 200 // 接口自动重试间隔时间
  readyState = WebSocket.CLOSED // 当前websocket连接状态

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
    this.ws = new WebSocket('ws://' + this.host +":"+ this.port + '/')
    this.onOpen()
    
  }
  onOpen() {
    this.ws.onopen = (e) => {
      console.log('WebSocket连接成功', e)
      this.readyState = WebSocket.OPEN
      this.onMessage()
    }
  }
  close() {
    this.ws.close()
  }
  onClose() {
    this.ws.onclose = (e) => {
      console.log('WebSocket连接已关闭', e)
      this.readyState = WebSocket.CLOSED
      this.ws = null
      // 清空接收消息缓存池子
      this.receivesMap.clear()
    }
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
    console.log('重连中...')
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
      this.isRetry && clearTimeout(this.receivesMap.get(res.id).timer)
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

      let timer = null
      if (this.isRetry) {
        timer = setTimeout(() => {
          this.receivesMap.delete(params.id)
          clearTimeout(timer)
          reject('timeout')
        }, this.timeout)
      }

      const params = {}
      params.id = new Date().getTime()
      // 把回调函数存起来
      // if (typeof callback === 'function') {
      //   this.receivesMap.set(params.id, callback)
      // }
      this.receivesMap.set(params.id, { resolve, reject, timer })
      
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
  //带有重试机制的接口发送方法
  callWithRetry(name, args = {}) {
    return new Promise((resolve, reject) => { 
      const attemptFn = (times) => {
        this.call(name, args).then(res => {
          console.log(`第${times}调用成功`,res)
          resolve(res)
        }).catch((err) => {
          console.log(`第 ${times} 次失败`, err)
          if (err === 'timeout') {
            // 重试逻辑
            if (times >= this.maxAttempts) {
              reject('重试次数已超过最大限制')
            } else { 
              setTimeout(() => {
                attemptFn(times + 1)
              }, this.retryInterval)
            }
          } else {
            //接口报错直接抛出错误
            reject(err)
          }
        })
      }
      attemptFn(1)
    })
  }
}