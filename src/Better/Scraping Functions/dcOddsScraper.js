const dcOddsScraper = async (driver, By, selector) => {
  try {
    let oneXOdds = [];
    let xTwoOdds = [];
    let oneTwoOdds = [];

    const infoes = await driver.findElements(By.className(selector));

    for (let i = 0; i < infoes.length; i++) {
      let container = await infoes[i].getAttribute("innerHTML");
      let odd = container.split('selection.status==1}">')[1];
      if (odd !== undefined) {
        odd = odd.split("</span>")[0];
        if (i % 3 === 0) oneXOdds.push(odd);
        if (i % 3 === 1) xTwoOdds.push(odd);
        if (i % 3 === 2) oneTwoOdds.push(odd);
      } else {
        if (i % 3 === 0) oneXOdds.push("1");
        if (i % 3 === 1) xTwoOdds.push("1");
        if (i % 3 === 2) oneTwoOdds.push("1");
      }
    }
    return { oneXOdds, xTwoOdds, oneTwoOdds };
  } catch (error) {
    console.log(error);
  }
};
module.exports = dcOddsScraper;
