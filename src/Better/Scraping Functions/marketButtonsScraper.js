const marketButtonsScraper = async (driver, By, selector) => {
  try {
    let buttonsNames = [];
    const buttons = await driver.findElements(By.className(selector));
    for (let i = 0; i < buttons.length; i++) {
      buttonsNames.push(await buttons[i].getAttribute("innerText"));
    }
    return {
      buttonsNames,
      buttons,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = marketButtonsScraper;
