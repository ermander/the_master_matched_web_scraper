const daysTimesAndMatchNamesScraper = async (html, By, selector) => {
  try {
    let days = [];
    let times = [];
    let homes = [];
    let aways = [];

    let rows = await html.findElements(By.css(selector));
    for (let i = 0; i < rows.length; i++) {
      let info = await rows[i].getAttribute("data-evndate");
      let matchName = await rows[i].getAttribute("data-evtname");
      days.push(info.split(" ")[0].replace("-", "/").replace("-", "/"));
      times.push(info.split(" ")[1]);
      homes.push(matchName.split(" - ")[0]);
      aways.push(matchName.split(" - ")[1]);
    }
    return { days, times, homes, aways };
  } catch (error) {
    console.log("Nothing found by daysAndTimesScraper function");
  }
};

module.exports = daysTimesAndMatchNamesScraper;
