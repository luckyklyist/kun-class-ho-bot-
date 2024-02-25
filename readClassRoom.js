const getClassInfo = (schedule) => {
  // Get the current date and time
  const currentDate = new Date();
  const currentDay = currentDate.toLocaleString("en-US", { weekday: "short" });
  const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();

  let currentClass = null;

  for (const classPeriod of schedule) {
    if (classPeriod.day === currentDay.toUpperCase()) {
      const [startTime, endTime] = classPeriod.time.split(" - ").map((time) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      });

      if (currentTime >= startTime && currentTime <= endTime) {
        currentClass = classPeriod;
        break;
      }
    }
  }

  // Prepare the result
  let result = "";
  if (currentClass) {
    result = `
    __**Class Information**__
    ***Title***: ${currentClass.title}
    ***Current Class***: ${currentClass.classType}
    ***Lecturer***: ${currentClass.lecturer}
    ***Room***: ${currentClass.room}
    ***Block***: ${currentClass.block}
    ***Group***: ${currentClass.group}
    ***Time***: ${currentClass.time}
    ***Hours***: ${currentClass.hours}
    ***Code***: ${currentClass.code}

    *Need help with anything else? Feel free to ask! 👩‍💻🚀*
    `;
  } else {
    // Find the nearest class
    let nearestClass = null;
    let timeDifference = Infinity;

    for (const classPeriod of schedule) {
      if (classPeriod.day === currentDay.toUpperCase()) {
        const [startTime, endTime] = classPeriod.time
          .split(" - ")
          .map((time) => {
            const [hours, minutes] = time.split(":").map(Number);
            return hours * 60 + minutes; // Convert time to minutes for easier comparison
          });

        const difference = Math.abs(currentTime - startTime);
        if (difference < timeDifference) {
          nearestClass = classPeriod;
          timeDifference = difference;
        }
      }
    }

    if (nearestClass) {
      // result = `The nearest class is the ${nearestClass.classType} class: ${nearestClass.title} by ${nearestClass.lecturer}`;
      result = `
      __**Class Information**__
      ***Title***: ${nearestClass.title}
      ***Next Class***: ${nearestClass.classType}
      ***Lecturer***: ${nearestClass.lecturer}
      ***Room***: ${nearestClass.room}
      ***Block***: ${nearestClass.block}
      ***Group***: ${nearestClass.group}
      ***Time***: ${nearestClass.time}
      ***Hours***: ${nearestClass.hours}
      
      *Need help with anything else? Feel free to ask! 👩‍💻🚀*
      
      `;
    } else {
      result = `
      *No classes for today! 🎉🎉*
      `;
    }
  }

  return result;
};

const getScheduleDay = (schedule, day) => {
  let result = "";
  for (const classPeriod of schedule) {
    if (classPeriod.day === day.toUpperCase()) {
      result += `
      __**Class Information**__
      ***Title***: ${classPeriod.title}
      ***Class***: ${classPeriod.classType}
      ***Lecturer***: ${classPeriod.lecturer}
      ***Room***: ${classPeriod.room}
      ***Block***: ${classPeriod.block}
      ***Group***: ${classPeriod.group}
      ***Time***: ${classPeriod.time}
      ***Hours***: ${classPeriod.hours} 
      `;
    }
  }
  result += `*Need help with anything else? Feel free to ask! 👩‍💻🚀*`;
  return result;
};

// export the functions
module.exports = {
  getClassInfo,
  getScheduleDay,
};
