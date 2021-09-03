const matchNamesScraper = async (html, By, selector) => {
  try {
    let homes = [];
    let aways = [];
    let matchNames = await html.findElements(By.className(selector));
    for (let i = 0; i < matchNames.length; i++) {
      matchNames[i] = await matchNames[i].getText();
      if (i % 2 === 1) {
        let home = matchNames[i].split(" - ")[0];
        let away = matchNames[i].split(" - ")[1];
        homes.push(home);
        aways.push(away);
      }
    }
    return { homes, aways };
  } catch (error) {
    console.log("Nothing found by matchNamesScraper function");
  }
};

module.exports = matchNamesScraper;
