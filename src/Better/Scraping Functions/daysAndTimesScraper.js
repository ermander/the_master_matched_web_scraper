const daysAndTimesScraper = async (driver, By, selector) => {
  try {
    let days = [];
    let times = [];
    const infoes = await driver.findElements(By.className(selector));
    for (let i = 0; i < infoes.length; i++) {
      let container = await infoes[i].getAttribute("innerText");
      days.push(container.split(" - ")[0]);
      times.push(container.split(" - ")[1]);
    }
    return { days, times };
  } catch (error) {
    console.log(error);
  }
};

module.exports = daysAndTimesScraper;
