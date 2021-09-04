const underOver3_5OddsScraper = async (driver, By, selector) => {
  try {
    let under3_5Odds = [];
    let over3_5Odds = [];

    const infoes = await driver.findElements(By.className(selector));
    for (let i = 0; i < infoes.length; i++) {
      let container = await infoes[i].getAttribute("innerText");
      if (i % 2 === 0) under3_5Odds.push(container);
      if (i % 2 === 1) over3_5Odds.push(container);
    }
    return {
      under3_5Odds,
      over3_5Odds,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = underOver3_5OddsScraper;
