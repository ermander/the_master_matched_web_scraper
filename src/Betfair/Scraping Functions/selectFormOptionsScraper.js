const selectFormOptionsScraper = async (driver, By, selector) => {
  try {
    let links = [];
    const selectForm = await driver.findElement(By.className(selector));
    await selectForm.click();
    const selectFormOptions = await driver.findElements(
      By.css("li.chooser > a")
    );
    for (let i = 0; i < selectFormOptions.length; i++) {
      let link = await selectFormOptions[i].getAttribute("href");
      links.push(link);
    }
    return links;
  } catch (error) {
    console.log(error);
  }
};

module.exports = selectFormOptionsScraper;
