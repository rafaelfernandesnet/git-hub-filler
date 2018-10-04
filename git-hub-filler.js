var moment = require('moment');
var exec = require("child_process").exec;
var fs = require('fs');
// loop from today until 365 backwards.
var allMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var allDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
var cmdAdd = "git add -A";
var cmdCommit;
var cmdPush = "git push";
var allDates = [];
var currentDate;
AppRun();
function AppRun() {
    make365Days();
    next();
}
function make365Days() {
    var numberOfDays = 365;
    for (var i = 0; i < numberOfDays; i++) {
        currentDate = moment().subtract(i.toString(), "days").format("L");
        var numberOfCommits = Math.floor(Math.random() * 20) + 1;
        for (var i_1 = 0; i_1 < numberOfCommits; i_1++) {
            allDates.push(currentDate);
        }
    }
}
function next() {
    cmdCommit = "git commit --date='" + allDates.pop() + "' -m 'Testing'";
    fs.readFile('main.txt', 'utf-8', fileRead);
}
;
function fileRead(err, data) {
    if (err)
        throw err;
    var newValue = Math.floor(Math.random() * 36000) + Math.floor(Math.random() * 36000) + 1;
    fs.writeFile('main.txt', newValue, 'utf-8', function (err) {
        if (err)
            throw err;
        exec(cmdAdd, cmdAdded);
        console.log(cmdAdd);
    });
}
function cmdAdded(error, stdout, stderr) {
    // command output is in stdout
    console.log(error);
    console.log(stdout);
    console.log(stderr);
    console.log(cmdCommit);
    exec(cmdCommit, cmdCommitted);
}
function cmdCommitted(error, stdout, stderr) {
    // command output is in stdout
    console.log(error);
    console.log(stdout);
    console.log(stderr);
    if (allDates.length > 0) {
        next();
    }
    else {
        console.log(cmdPush);
        exec(cmdPush, cmdPushed);
    }
}
function cmdPushed(error, stdout, stderr) {
    // command output is in stdout
    console.log(error);
    console.log(stdout);
    console.log(stderr);
}
