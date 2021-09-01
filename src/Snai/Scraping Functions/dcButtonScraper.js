const dcButtonScraper = async (driver, By, selector) => {
  try {
    let buttons = await driver.findElements(By.className(selector));
    let buttonsName = [];
    for (let i = 0; i < buttons.length; i++) {
      buttonsName.push(await buttons[i].getText());
    }

    const dcIndex = buttonsName.indexOf("DOPPIA CHANCE");

    let whileStatus = true;
    while (whileStatus) {
      let isButtonClicked = await buttons[dcIndex].click();
      if (!isButtonClicked) {
        whileStatus = false;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = dcButtonScraper;
