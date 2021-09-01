const oddsScraper = async (driver, By, selector) => {
  try {
    let odds = await driver.findElements(By.className(selector));

    for (let i = 0; i < odds.length; i++) {
      odds[i] = await odds[i].getText();
    }

    odds = odds.reverse();
    let one = [];
    let x = [];
    let two = [];
    let under = [];
    let over = [];
    let goal = [];
    let noGoal = [];

    for (let i = 0; i < odds.length; i++) {
      if (i % 7 === 0) one.push(odds[i]);
      if (i % 7 === 1) x.push(odds[i]);
      if (i % 7 === 2) two.push(odds[i]);
      if (i % 7 === 3) under.push(odds[i]);
      if (i % 7 === 4) over.push(odds[i]);
      if (i % 7 === 5) goal.push(odds[i]);
      if (i % 7 === 6) noGoal.push(odds[i]);
    }

    one = one.reverse();
    x = x.reverse();
    two = two.reverse();
    under = under.reverse();
    over = over.reverse();
    goal = goal.reverse();
    noGoal = noGoal.reverse();

    return { one, x, two, under, over, goal, noGoal };
  } catch (error) {
    console.log(error);
  }
};

module.exports = oddsScraper;
