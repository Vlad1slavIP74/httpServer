'use strict';

const threads = require('worker_threads');
const { Worker, threadId, parentPort } = threads;

const worker = new Worker('./create.js');

worker.on('message', msg => {
  if (msg.name === 'started') {
    parentPort.postMessage(`Hello from thread #${threadId}.`);
  }
});

process.on('SIGTERM', () => {
  worker.terminate(() => {
    console.log('HTTP Server Stopped');
  });
});