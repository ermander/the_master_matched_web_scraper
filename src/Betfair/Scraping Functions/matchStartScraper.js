const months = require("../Months/months");

const matchStartScraper = async (driver, By, selector) => {
  try {
    let days = [];
    let times = [];
    let date = new Date();
    date = date.toString();
    let addYear = date.split(" ")[3];
    let addDay = date.split(" ")[2];
    let addMonth = date.split(" ")[1];

    const infoes = await driver.findElements(By.className(selector));
    for (let i = 0; i < infoes.length; i++) {
      let info = await infoes[i].getAttribute("innerText");
      if (info.split(" ")[0] === "Domani") {
        if (parseInt(addDay) <= 8) {
          let day = `0${parseInt(addDay) + 1}/${months[addMonth]}/${addYear}`;
          let time = info.split(" ")[1];
          days.push(day);
          times.push(time);
        } else {
          let day = `${addDay}/${months[addMonth]}/${addYear}`;
          let time = info.split(" ")[1];
          days.push(day);
          times.push(time);
        }
      }
      if (info.split(" ") !== "Domani" && info.split(" ").length === 1) {
        let day = `${addDay}/${months[addMonth]}/${addYear}`;
        let time = info;
        days.push(day);
        times.push(time);
      }
      if(info.split(" ")[0] === "Inizio"){
          let day = `${addDay}/${months[addMonth]}/${addYear}`;
          let d = new Date()
          let milliseconds = Date.parse(d)
          console.log(info.split(" "))
          milliseconds = milliseconds + (parseInt(info.split(" ")[2].split("′")[0]) + 1)
          d = new Date(milliseconds)
          console.log(d)
      }
    }
    console.log(days, times);
  } catch (error) {
    console.log(error);
  }
};
module.exports = matchStartScraper;
