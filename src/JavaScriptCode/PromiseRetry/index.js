const getData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const num = Math.floor(Math.random() * 10)
      console.log('num', num)
      num < 9 ?
        reject(new Error('num small'))
        :
        resolve(num)
    }, 1000)
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
    let attempts = 0
    fn().then(data => {
      resolve(data)
    }).catch(err => { 
      while (attempts < maxAttempts) {
        attempts++
        setTimeout(() => {
          fn().then(data => {
            console.log(`第 ${attempts}次`,data)
            resolve(data)
          }).catch(err => {
            console.log(`第 ${attempts}次`)
            reject(err)
          })
        }, delay)
      }
    })
  })
}

// getData()
//   .then(data => console.log(data))
//   .catch(err => console.log(err))

myGetData(getData, 100, 3)
  .then(data => console.log("ffff success",data))
  .catch(err => console.log("fail",err))