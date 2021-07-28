import React from 'react';
import ReactDOM from 'react-dom';
import { Scene, Entity } from 'aframe-react';
import 'aframe-environment-component';

import './index.css';
import { chartData } from 'vria';
import VRIA from 'vria';


// export {generate_chart};

// ReactDOM.render(<App/>, document.getElementById('root'));
console.log("Print test!");
console.log(chartData);

// 生成VRIA图表，以便更新数据
const generate_chart = (chart_data) =>  (
  <Scene>
    <VRIA
      position = {chart_data['position']}
      config = {chart_data['config']}
    />
  </Scene>
)



// 建立websocket连接
let ws = new WebSocket('ws://localhost:3002/');
ws.onopen = function(){
  setInterval(function(){
    ws.send(JSON.stringify(chartData));
  },2000);
}

ws.onmessage = function(e){
  let chart_data = JSON.parse(e.data);
  console.log(chart_data);
  ReactDOM.render(generate_chart(chart_data), document.getElementById('root'));
  ws.send(JSON.stringify(chartData));
}

// 创建服务器
// let http = require('http');
// let server = new http.Server();
// var express = require('express');
// var http = require('http');
// var app = express();
// var server = http.createServer(app);



// 设置响应
// server.on('request', function (request, response){
//   console.log('收到请求，请求路径为: ' + request.url);
//   console.log('请求的客户端地址为: ', request.socket.remoteAddress, request.socket.remotePort);
//
//   let url = request.url;
//   let body = JSON.parse(request.body);
//   if(url === '/getChartData'){
//     generate_chart(body);
//
//     response.body = chartData;
//
//   }
// });
//
// server.listen(3001, function() {
//   console.log('服务器启动成功......')
// });

