#!/usr/bin/env node
'use strict';
const moment = require("moment");
const {spawn} = require('child_process');

const args = [
  'stream',
  '--predicate', `(processImagePath contains "Asterius") and senderImageUUID == processImageUUID`,
  '--style', 'json'
];

const lg = spawn('log', args);

lg.stdout.on('data', data => {
  const str = data.toString();

  // Assumption: { is always at the end of a line, } at the start of line.
  const m = str.match(/\{$[\s\S]+?^\}/mg);
  if (m === null) {
    return;
  }

  const all = m.map(str => JSON.parse(str));

  all.forEach(({timestamp, eventMessage}) => {
    console.log(eventMessage);
    console.log('\n');

    // const time = moment(timestamp).format("H:mm:ss");
    // console.log([time, eventMessage].join(": "));
  });

});

lg.stderr.on('data', data => {
  console.log(`stderr: ${data}`);
});

lg.on('close', code => {
  console.log(`child process exited with code ${code}`);
});