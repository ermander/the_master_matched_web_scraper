const daysScraper = async (driver, By, selector) => {
  try {
    let days = await driver.findElements(By.css(selector));
    for (let i = 0; i < days.length; i++) {
      days[i] = await days[i].getText();
      days[i] = days[i].split("  ")[1];
    }
    return days;
  } catch (error) {
    console.log(error);
  }
};

module.exports = daysScraper;
