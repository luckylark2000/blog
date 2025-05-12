console.log("start")


const module = (() => {
  const sleep= async( time ) =>{
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("sleep 1s")
        resolve()
      }, 1000)
    })
  }

  return {
    sleep
  }
  
})()

await module.sleep(1000)

await new Promise(resolve => setTimeout(resolve, 2000))


console.log("end")
