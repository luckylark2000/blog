// import { ref, Ref } from 'vue-demi'
// import { Fn, tryOnUnmounted, useIntervalFn } from '@vueuse/shared'

// export type WebSocketStatus = 'OPEN' | 'CONNECTING' | 'CLOSED'

// export interface WebSocketOptions {
//   onConnected?: (ws: WebSocket) => void
//   onDisconnected?: (ws: WebSocket, event: CloseEvent) => void
//   onError?: (ws: WebSocket, event: Event) => void
//   onMessage?: (ws: WebSocket, event: MessageEvent) => void

//   /**
//    * Send heartbeat for every x milliseconds passed
//    *
//    * @default false
//    */
//   heartbeat?: boolean | {
//     /**
//      * Message for the heartbeat
//      *
//      * @default 'ping'
//      */
//     message?: string

//     /**
//      * Interval, in milliseconds
//      *
//      * @default 1000
//      */
//     interval?: number
//   }

//   /**
//    * Enabled auto reconnect
//    *
//    * @default false
//    */
//   autoReconnect?: boolean | {
//     /**
//      * Maximum retry times.
//      *
//      * @default -1
//      */
//     retries?: number

//     /**
//      * Delay for reconnect, in milliseconds
//      *
//      * @default 1000
//      */
//     delay?: number

//     /**
//      * On maximum retry times reached.
//      */
//     onFailed?: Fn
//   }

//   /**
//    * Automatically open a connection
//    *
//    * @default false
//    */
//   immediate?: boolean
// }

// export interface WebSocketResult<T> {
//   /**
//    * Reference to the latest data received via the websocket,
//    * can be watched to respond to incoming messages
//    */
//   data: Ref<T | null>

//   /**
//    * The current websocket status, can be only one of:
//    * 'OPEN', 'CONNECTING', 'CLOSED'
//    */
//   status: Ref<WebSocketStatus>

//   /**
//    * Closes the websocket connection gracefully.
//    */
//   close: WebSocket['close']

//   /**
//    * Reopen the websocket connection.
//    * If there the current one is active, will close it before opening a new one.
//    */
//   open: Fn

//   /**
//    * Sends data through the websocket connection.
//    *
//    * @param data
//    * @param useBuffer when the socket is not yet open, store the data into the buffer and sent them one connected. Default to true.
//    */
//   send: (data: string | ArrayBuffer | Blob, useBuffer?: boolean) => boolean

//   /**
//    * Reference to the WebSocket instance.
//    */
//   ws: Ref<WebSocket | undefined>
// }

function resolveNestedOptions(options){
  if (options === true)
    return {}
  return options
}

/**
 * Reactive WebSocket client.
 *
 * @see https://vueuse.org/useWebSocket
 * @param url
 */
export function useWebSocket(
  url,
  options= {},
) {
  const {
    onConnected,
    onDisconnected,
    onError,
    onMessage,
  } = options

  const data = {value:null} //ref(null)
  const status = {value:'CONNECTING'} //ref<WebSocketStatus>('CONNECTING')
  const wsRef ={value:undefined} // ref<WebSocket | undefined>()

  let heartbeatPause // Fn | undefined
  let heartbeatResume //Fn | undefined

  let explicitlyClosed = false
  let retried = 0

  let bufferedData = []

  const close = (code, reason) => {
    if (!wsRef.value)
      return
    explicitlyClosed = true
    heartbeatPause?.()
    wsRef.value.close(code, reason)
  }

  const _sendBuffer = () => {
    if (bufferedData.length && wsRef.value && status.value === 'OPEN') {
      for (const buffer of bufferedData)
        wsRef.value.send(buffer)
      bufferedData = []
    }
  }

  const send = (data, useBuffer = true) => {
    if (!wsRef.value || status.value !== 'OPEN') {
      if (useBuffer)
        bufferedData.push(data)
      return false
    }
    _sendBuffer()
    wsRef.value.send(data)
    return true
  }

  const _init = () => {
    const ws = new WebSocket(url)
    wsRef.value = ws
    status.value = 'CONNECTING'
    explicitlyClosed = false

    ws.onopen = () => {
      status.value = 'OPEN'
      onConnected?.(ws)
      heartbeatResume?.()
      _sendBuffer()
    }

    ws.onclose = (ev) => {
      status.value = 'CLOSED'
      wsRef.value = undefined
      onDisconnected?.(ws, ev)

      if (!explicitlyClosed && options.autoReconnect) {
        const {
          retries = -1,
          delay = 1000,
          onFailed,
        } = resolveNestedOptions(options.autoReconnect)
        retried += 1

        if (retries < 0 || retried < retries)
          setTimeout(_init, delay)
        else
          onFailed?.()
      }
    }

    ws.onerror = (e) => {
      onError?.(ws, e)
    }

    ws.onmessage = (e) => {
      data.value = e.data
      onMessage?.(ws, e)
    }
  }

  if (options.heartbeat) {
    const {
      message = 'ping',
      interval = 1000,
    } = resolveNestedOptions(options.heartbeat)

    const { pause, resume } = useIntervalFn(() => send(message, false), interval, false)

    heartbeatPause = pause
    heartbeatResume = resume
  }

  if (options.immediate) _init()

  const open = () => {
    close()
    retried = 0
    _init()
  }

  tryOnUnmounted(close)

  return {
    data,
    status,
    close,
    send,
    open,
    ws: wsRef,
  }
}

/**
 * Wrapper for `setInterval` with controls
 *
 * @param { Function }cb 
 * @param interval
 * @param immediate
 */
export function useIntervalFn(cb, interval = 1000, immediate = true) {
  let timer= null
  const isActive = {value:false}//ref(false)

  function clean() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  function pause() {
    isActive.value = false
    clean()
  }

  function resume() {
    if (interval <= 0)
      return
    isActive.value = true
    clean()
    timer = setInterval(cb, interval)
  }

  if (immediate)
    resume()

  return {
    isActive,
    pause,
    resume,
    start: resume,
    stop: pause,
  }
}