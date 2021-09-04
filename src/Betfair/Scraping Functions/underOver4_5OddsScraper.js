const underOver4_5Scraper = async (driver, By, selector) => {
  try {
    const container = await driver.findElement(By.className("markets-wrapper"));
    let odds = await container.findElements(By.className(selector));
    let under4_5Odds = [];
    let over4_5Odds = [];
    for (let i = 0; i < odds.length; i++) {
      let element = await odds[i].getAttribute("innerText");
      under4_5Odds.push(element.split("\n")[0]);
      over4_5Odds.push(element.split("\n")[1]);
    }
    under4_5Odds = under4_5Odds.map((odd) => {
      if (odd === "") odd = "1";
      if (odd === undefined) odd = "1";
      return odd;
    });
    over4_5Odds = over4_5Odds.map((odd) => {
      if (odd === "") odd = "1";
      if (odd === undefined) odd = "1";
      return odd;
    });
    return { under4_5Odds, over4_5Odds };
  } catch (error) {
    console.log(error);
  }
};

module.exports = underOver4_5Scraper;
