const underOver1_5OddsScraper = async (driver, By, selector) => {
  try {
    let under1_5Odds = [];
    let over1_5Odds = [];

    const infoes = await driver.findElements(By.className(selector));
    for (let i = 0; i < infoes.length; i++) {
      let container = await infoes[i].getAttribute("innerText");
      if (i % 2 === 0) under1_5Odds.push(container);
      if (i % 2 === 1) over1_5Odds.push(container);
    }
    return {
      under1_5Odds,
      over1_5Odds,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = underOver1_5OddsScraper;
