"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScheduleDay = exports.getClassInfo = void 0;
var getClassInfo = function (schedule) {
    // Get the current date and time
    var currentDate = new Date();
    var currentDay = currentDate.toLocaleString("en-US", { weekday: "short" });
    var currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
    var currentClass = null;
    for (var _i = 0, schedule_1 = schedule; _i < schedule_1.length; _i++) {
        var classPeriod = schedule_1[_i];
        if (classPeriod.day === currentDay.toUpperCase()) {
            var _a = classPeriod.time
                .split(" - ")
                .map(function (time) {
                var _a = time.split(":").map(Number), hours = _a[0], minutes = _a[1];
                return hours * 60 + minutes;
            }), startTime = _a[0], endTime = _a[1];
            if (currentTime >= startTime && currentTime <= endTime) {
                currentClass = classPeriod;
                break;
            }
        }
    }
    // Prepare the result
    var result = "";
    if (currentClass) {
        result = "\n    __**Class Information**__\n    ***Title***: ".concat(currentClass.title, "\n    ***Current Class***: ").concat(currentClass.classType, "\n    ***Lecturer***: ").concat(currentClass.lecturer, "\n    ***Room***: ").concat(currentClass.room, "\n    ***Block***: ").concat(currentClass.block, "\n    ***Group***: ").concat(currentClass.group, "\n    ***Time***: ").concat(currentClass.time, "\n    ***Hours***: ").concat(currentClass.hours, "\n    ***Code***: ").concat(currentClass.code, "\n\n    *Need help with anything else? Feel free to ask! \uD83D\uDC69\u200D\uD83D\uDCBB\uD83D\uDE80*\n    ");
    }
    else {
        // Find the nearest class
        var nearestClass = null;
        var timeDifference = Infinity;
        for (var _b = 0, schedule_2 = schedule; _b < schedule_2.length; _b++) {
            var classPeriod = schedule_2[_b];
            if (classPeriod.day === currentDay.toUpperCase()) {
                var _c = classPeriod.time
                    .split(" - ")
                    .map(function (time) {
                    // Add type annotation to 'time' parameter
                    var _a = time.split(":").map(Number), hours = _a[0], minutes = _a[1];
                    return hours * 60 + minutes; // Convert time to minutes for easier comparison
                }), startTime = _c[0], endTime = _c[1];
                var difference = Math.abs(currentTime - startTime);
                if (difference < timeDifference) {
                    nearestClass = classPeriod;
                    timeDifference = difference;
                }
            }
        }
        if (nearestClass) {
            // result = `The nearest class is the ${nearestClass.classType} class: ${nearestClass.title} by ${nearestClass.lecturer}`;
            result = "\n      __**Class Information**__\n      ***Title***: ".concat(nearestClass.title, "\n      ***Next Class***: ").concat(nearestClass.classType, "\n      ***Lecturer***: ").concat(nearestClass.lecturer, "\n      ***Room***: ").concat(nearestClass.room, "\n      ***Block***: ").concat(nearestClass.block, "\n      ***Group***: ").concat(nearestClass.group, "\n      ***Time***: ").concat(nearestClass.time, "\n      ***Hours***: ").concat(nearestClass.hours, "\n      \n      *Need help with anything else? Feel free to ask! \uD83D\uDC69\u200D\uD83D\uDCBB\uD83D\uDE80*\n      \n      ");
        }
        else {
            result = "\n      *No classes for today! \uD83C\uDF89\uD83C\uDF89*\n      ";
        }
    }
    return result;
};
exports.getClassInfo = getClassInfo;
var getScheduleDay = function (schedule, day) {
    var result = "";
    for (var _i = 0, schedule_3 = schedule; _i < schedule_3.length; _i++) {
        var classPeriod = schedule_3[_i];
        if (classPeriod.day === day.toUpperCase()) {
            result += "\n      __**Class Information**__\n      ***Title***: ".concat(classPeriod.title, "\n      ***Class***: ").concat(classPeriod.classType, "\n      ***Lecturer***: ").concat(classPeriod.lecturer, "\n      ***Room***: ").concat(classPeriod.room, "\n      ***Block***: ").concat(classPeriod.block, "\n      ***Group***: ").concat(classPeriod.group, "\n      ***Time***: ").concat(classPeriod.time, "\n      ***Hours***: ").concat(classPeriod.hours, " \n      ");
        }
    }
    result += "*Need help with anything else? Feel free to ask! \uD83D\uDC69\u200D\uD83D\uDCBB\uD83D\uDE80*";
    return result;
};
exports.getScheduleDay = getScheduleDay;
