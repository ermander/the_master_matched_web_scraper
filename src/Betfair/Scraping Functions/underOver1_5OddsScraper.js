const underOver1_5Scraper = async (driver, By, selector) => {
  try {
    const container = await driver.findElement(By.className("markets-wrapper"));
    let odds = await container.findElements(By.className(selector));
    let under1_5Odds = [];
    let over1_5Odds = [];
    for (let i = 0; i < odds.length; i++) {
      let element = await odds[i].getAttribute("innerText");
      under1_5Odds.push(element.split("\n")[0]);
      over1_5Odds.push(element.split("\n")[1]);
    }
    under1_5Odds = under1_5Odds.map((odd) => {
      if (odd === "") odd = "1";
      if (odd === undefined) odd = "1";
      return odd;
    });
    over1_5Odds = over1_5Odds.map((odd) => {
      if (odd === "") odd = "1";
      if (odd === undefined) odd = "1";
      return odd;
    });
    return { under1_5Odds, over1_5Odds };
  } catch (error) {
    console.log(error);
  }
};

module.exports = underOver1_5Scraper;
