import WebsocketClient from "./websocket.js";

const client = new WebsocketClient({port:666});

const btn1 = document.getElementById("btn1")
const btn2 = document.getElementById("btn2")
const ping = document.getElementById("ping")

btn1.addEventListener("click", function () { 
  client.call("hello").then(function (data) { 
    console.log("hello 接收的成功数据",data);
  }).catch(function (error) { 
    console.log("接收的错误数据",error);
  })
})

btn2.addEventListener("click", function () { 
  client.call("world").then(function (data) { 
    console.log("world接收的成功数据",data);
  }).catch(function (error) { 
    console.log("接收的错误数据",error);
  })
})

ping.addEventListener("click", function () { 
  // client.send("ping")
  client.call("ping").then(function (data) { 
    console.log("ping接收的成功数据",data);
  }).catch(function (error) { 
    console.log("接收的错误数据",error);
  })
})

// client.call("SAM_GetDeviceList", function (data) { 
//   console.log(data);
// })