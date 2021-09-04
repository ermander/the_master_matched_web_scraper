const startDaysTimesAndMatchNamesScraper = async (driver, By, selector) => {
  try {
    let days = [];
    let times = [];
    let homes = [];
    let aways = [];

    let rows = await driver.findElements(By.className(selector));
    for (let i = 0; i < rows.length; i++) {
      let startInfoes = await rows[i].getAttribute("data-datainizio");
      let matchNamesInfoes = await rows[i].getAttribute(
        "data-sottoevento-name"
      );
      days.push(startInfoes.split("T")[0].replace("-", "/").replace("-", "/"));
      times.push(
        startInfoes.split("T")[1].split(":")[0] +
          ":" +
          startInfoes.split("T")[1].split(":")[1]
      );
      homes.push(matchNamesInfoes.split(" - ")[0]);
      aways.push(matchNamesInfoes.split(" - ")[1]);
    }
    return { days, times, homes, aways };
  } catch (error) {
    console.log("Nothin found by startDaysTimesAndMatchNamesScraper function");
  }
};
module.exports = startDaysTimesAndMatchNamesScraper;
