const matchNamesScraper = async (driver, By, selector) => {
  try {
    let homes = [];
    let aways = [];
    const infoes = await driver.findElements(By.className(selector));
    for (let i = 0; i < infoes.length; i++) {
      let container = await infoes[i].getAttribute("innerText");
      homes.push(container.split(" - ")[0]);
      aways.push(container.split(" - ")[1]);
    }
    return { homes, aways };
  } catch (error) {
    console.log(error);
  }
};

module.exports = matchNamesScraper;
