const getData = () => {
  return new Promise((resolve, reject) => {
    // 如果3秒内都没有获取到数据直接reject
    let timeout = setTimeout(() => {
      reject(new Error('3秒内没有获取到数据'))
    }, 3000)
    setTimeout(() => {
      clearInterval(timeout)
      const num = Math.floor(Math.random() * 10)
      num < 8 ? reject(new Error(`${num}`)) : resolve(num)
    }, Math.floor(Math.random() * 10) * 1000/2)
  })
  // 另一种方式
  // return new Promise(async (resolve, reject) => {
  //   let timeout = setTimeout(() => {
  //     reject(new Error('3秒内没有获取到数据'))
  //   }, 3000)
  //   // 模拟异步操作
  //   await new Promise(resolveFn => setTimeout(resolveFn, Math.floor(Math.random() * 10) * 1000/2))
  //   clearInterval(timeout)
  //   const num = Math.floor(Math.random() * 10)
  //   num < 7 ?
  //     reject(new Error(`${num}`))
  //     : resolve(num)
  // })
}
/**
 * 
 * @param {()=>Promise<number} fn 
 * @param {*} delay 
 * @param {*} maxAttempts 
 * @returns 
 */
const myGetData1 = (fn, delay, maxAttempts) => {
  return new Promise(async (resolve, reject) => { 
    // let attempts = 0
    try { 
      const data = await fn()
       resolve(data)
    } catch (error) {
      console.log(`开始重试第 ${4-maxAttempts}次`,error)
      if (maxAttempts > 0) {
        let attempts = maxAttempts - 1
        await new Promise(resolve1 => setTimeout(resolve1, delay))
        try {
          const d= await myGetData( fn, delay, attempts)
          console.log(`成功`,d)
          resolve(d)
          
        } catch (err) {
          console.log(`失败`,err)
          reject(err)
        }
      } else {
        reject(new Error('超出最大尝试次数'))
      }
    }
  })
}

/**
 * 
 * @param {()=>Promise<number} fn 
 * @param {*} delay 
 * @param {*} maxAttempts 
 * @returns 
 */
const myGetData = (fn, delay, maxAttempts) => {
  return new Promise((resolve, reject) => {
    const attemptFn = (times) => {
      fn().then(data => {
        console.log(`第 ${times} 次成功`,data)
        resolve(data)
      }).catch(err => {
        console.log(`第 ${times} 次失败`,err?.message)
        if (times >= maxAttempts) {
          reject(new Error('超出最大尝试次数'))
        } else {
          setTimeout(() => {
            attemptFn(times + 1)
          }, delay)
          // console.log(`开始重试第 ${times}次`,err)
        }
      })
    }
    attemptFn(1)
  })
  
}

// getData()
//   .then(data => console.log(data))
//   .catch(err => console.log(err))

myGetData(getData, 100, 10)
  .then(data => console.log("获取的结果",data))
  .catch(err => console.log("失败原因",err?.message))