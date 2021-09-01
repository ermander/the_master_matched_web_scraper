const oneXTwoScraper = async (driver, By, selector) => {
  try {
    let oneXTwoOdds = await driver.findElements(By.className(selector));
    let oneOdds = [];
    let xOdds = [];
    let twoOdds = [];

    for (let i = 0; i < oneXTwoOdds.length; i++) {
      oneXTwoOdds[i] = await oneXTwoOdds[i].getText();
      if (i % 3 === 0) oneOdds.push(oneXTwoOdds[i]);
      if (i % 3 === 1) xOdds.push(oneXTwoOdds[i]);
      if (i % 3 === 2) twoOdds.push(oneXTwoOdds[i]);
    }

    return { oneOdds, xOdds, twoOdds };
  } catch (error) {
    console.log(error);
  }
};

module.exports = oneXTwoScraper;
