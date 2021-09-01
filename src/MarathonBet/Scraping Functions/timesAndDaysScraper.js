const timesAndDaysScraper = async (driver, By, selector) => {
  try {
    let timesAndDays = await driver.findElements(By.className(selector));
    let days = [];
    let times = [];
    for (let i = 0; i < timesAndDays.length; i++) {
      timesAndDays[i] = await timesAndDays[i].getText();
      let day =
        timesAndDays[i].split(" ")[0] + " " + timesAndDays[i].split(" ")[1];
      let time = timesAndDays[i].split(" ")[2];
      days.push(day);
      times.push(time);
    }

    return { days, times };
  } catch (error) {
    console.log(error);
  }
};

module.exports = timesAndDaysScraper;
