declare const require: any;
declare const Atomics: any;
declare const SharedArrayBuffer: any;
declare const Promise: any;
declare const resolve: any;

const moment: any = require('moment');

var exec = require("child_process").exec;
var fs = require('fs');

// loop from today until 365 backwards.

const allMonths = [1,2,3,4,5,6,7,8,9];
const allDays= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];

const cmdAdd = "git add -A";
let cmdCommit: string;
const cmdPush = "git push";

let allDates:any = [];
let currentDate: string;

AppRun();

function AppRun() {
  make365Days();
  next();
}

function make365Days(){
  const numberOfDays: number = 365;
  for (let i = 0; i < numberOfDays; i++) {
    currentDate = moment().subtract(i, 'days').format("L");
    let numberOfCommits = Math.floor(Math.random() * 20) + 1;
    for(let i=0;i<numberOfCommits; i++){
        allDates.push(currentDate);
    }
  }
}

function next(){
  cmdCommit = "git commit --date='" + allDates.pop() + "' -m 'Testing'";

  fs.readFile('main.txt', 'utf-8', fileRead);
};

function fileRead(err: any, data: any){
  if (err) throw err;

  var newValue = Math.floor(Math.random() * 36000) + Math.floor(Math.random() * 36000) + 1;

  fs.writeFile('main.txt', newValue, 'utf-8', function (err: any) {
      if (err) throw err;
      exec(cmdAdd, cmdAdded);

      console.log(cmdAdd);
  });
}

function cmdAdded(error: any, stdout: any, stderr: any) {
  // command output is in stdout
  console.log(error);
  console.log(stdout);
  console.log(stderr);

  console.log(cmdCommit);
  exec(cmdCommit, cmdCommitted);
}

function cmdCommitted(error: any, stdout: any, stderr: any) {
  // command output is in stdout
  console.log(error);
  console.log(stdout);
  console.log(stderr);

  if (allDates.length > 0){
    next();
  } else {
    console.log(cmdPush);
    exec(cmdPush, cmdPushed);
  }
}

function cmdPushed(error: any, stdout: any, stderr: any) {
  // command output is in stdout
  console.log(error);
  console.log(stdout);
  console.log(stderr);
}