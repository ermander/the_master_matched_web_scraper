const underOver3_5Scraper = async (driver, By, selector) => {
  try {
    const container = await driver.findElement(By.className("markets-wrapper"));
    let odds = await container.findElements(By.className(selector));
    let under3_5Odds = [];
    let over3_5Odds = [];
    for (let i = 0; i < odds.length; i++) {
      let element = await odds[i].getAttribute("innerText");
      under3_5Odds.push(element.split("\n")[0]);
      over3_5Odds.push(element.split("\n")[1]);
    }
    under3_5Odds = under3_5Odds.map((odd) => {
      if (odd === "") odd = "1";
      if (odd === undefined) odd = "1";
      return odd;
    });
    over3_5Odds = over3_5Odds.map((odd) => {
      if (odd === "") odd = "1";
      if (odd === undefined) odd = "1";
      return odd;
    });
    return { under3_5Odds, over3_5Odds };
  } catch (error) {
    console.log(error);
  }
};

module.exports = underOver3_5Scraper;
