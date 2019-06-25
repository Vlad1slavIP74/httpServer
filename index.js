'use strict';

const http = require('http');
const threads = require('worker_threads');

const routes = require('./src/router.js')

const hostname = '127.0.0.1';
const port = 3000;

const router = {
    '/': 'Hello World\n',
    '/create': threads.parentPort.postMessage({ name: 'started', port }),
    '/read': routes.read(),
    '/update': routes.update(),
    '/delete': routes.myDelete()
}

const server = http.createServer((req, res) => {
  const data = router[req.url];
  res.end(data);    
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

server.on('error', err => {
  if (err.code === 'EACCES') {
    console.log(`No access to port: ${port}`);
  }
});