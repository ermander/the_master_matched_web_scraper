const daysAndTimesScraper = async (html, By, selector) => {
  try {
    let days = [];
    let times = [];

    let rows = await html.findElements(By.css(selector));
    for (let i = 0; i < rows.length; i++) {
      let info = await rows[i].getAttribute("data-evndate");
      days.push(info.split(" ")[0].replace("-", "/").replace("-", "/"));
      times.push(info.split(" ")[1]);
    }
    return { days, times };
  } catch (error) {
    console.log("Nothing found by daysAndTimesScraper function");
  }
};

module.exports = daysAndTimesScraper;
