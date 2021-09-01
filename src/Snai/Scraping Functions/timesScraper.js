const timesScraper = async (driver, By, selector) => {
  try {
    let times = await driver.findElements(By.className(selector));

    for (let i = 0; i < times.length; i++) {
      times[i] = await times[i].getText();
    }
    return times;
  } catch (error) {
    console.log(error);
  }
};

module.exports = timesScraper;
