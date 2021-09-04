const underOver0_5Scraper = async (driver, By, selector) => {
  try {
    const container = await driver.findElement(By.className("markets-wrapper"));
    let odds = await container.findElements(By.className(selector));
    let under0_5Odds = [];
    let over0_5Odds = [];
    for (let i = 0; i < odds.length; i++) {
      let element = await odds[i].getAttribute("innerText");
      under0_5Odds.push(element.split("\n")[0]);
      over0_5Odds.push(element.split("\n")[1]);
    }
    under0_5Odds = under0_5Odds.map((odd) => {
      if (odd === "") odd = "1";
      if (odd === undefined) odd = "1";
      return odd;
    });
    over0_5Odds = over0_5Odds.map((odd) => {
      if (odd === "") odd = "1";
      if (odd === undefined) odd = "1";
      return odd;
    });
    return { under0_5Odds, over0_5Odds };
  } catch (error) {
    console.log(error);
  }
};

module.exports = underOver0_5Scraper;
