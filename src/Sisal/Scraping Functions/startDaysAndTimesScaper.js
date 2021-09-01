const startDaysAndTimesScaper = async (driver, By, selector) => {
  try {
    let startDaysAndTimes = await driver.findElements(By.className(selector));
    let startDays = [];
    let startTimes = [];
    for (let i = 0; i < startDaysAndTimes.length; i++) {
      startDaysAndTimes[i] = await startDaysAndTimes[i].getText();
      let startDay = startDaysAndTimes[i].split("\n")[0];
      let startTime = startDaysAndTimes[i].split("\n")[1];
      startDays.push(startDay);
      startTimes.push(startTime);
    }
    return { startDays, startTimes };
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = startDaysAndTimesScaper;
