// Selenium library
const { Builder, By, Capabilities } = require("selenium-webdriver");
// Chrome Web Driver
const chrome = require("selenium-webdriver/chrome");
// JSDOM library.
// This library is used in this program only for performance testing
// (The only purpose is to "console.log()" the time passed between one function and another)
const { JSDOM } = require("jsdom");
const { window } = new JSDOM();

// FS library, due to writing the odds result in JSON format
const fs = require("fs");

// Importing all the scraping functions, divided by each bookmaker.
// GoldBet
const goldbetScraper = require("./GoldBet/goldbetScraper");
// Eurobet
const eurobetScraper = require("./Eurobet/eurobetScraper");
// Betaland
const betalandScraper = require("./Betaland/betalandScraper");

// Importing all the links to scrape for each function
// GoldBet
const goldbetLinks = require("./GoldBet/goldbetLinks");
// Eurobet
// Betaland
const betalandLinks = require("./Betaland/betalandLinks");

/* 
  Some times the scraping functions needs some breaks between tasks
  Here we're creating a function that stops the code if needed.
  It takes a parameter (ms) that specifies the break time (in milliseconds)
*/
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* 
  Here we're creating the mainScraper function.
  In this function we will have all the functions that we need for scraping all the bookmakers we need.
  In this function (and also in this file) we will provide only the parameters required by the functions
  (like links and selenium options).
*/
const mainScraper = async () => {
  /*
    Here we save the initial time.
    So, here we save the time when the main scraper function has started.
    Later we will be able to know how long did it takes for the main function
    to get all the informations 
  */
  const start = window.performance.now();

  // // Printing in the console that the function is starting the web scraping proccess
  // console.log("Starting the main scraper function.");

  // // Scraping GoldBet
  // console.log("Starting to scrape GoldBet odds.");
  // let goldbetWhileStatus = true;
  // let goldbetOdds = [];
  // while (goldbetWhileStatus) {
  //   const goldbetOddsResults = await goldbetScraper(
  //     chrome,
  //     Builder,
  //     By,
  //     Capabilities,
  //     goldbetLinks
  //   );
  //   if (goldbetOddsResults.error) {
  //     goldbetWhileStatus = true;
  //     /*
  //       Implement the console.log() of the specific error
  //     */
  //     console.log(
  //       "I'm restarting the scraping function for GoldBet due to some errors"
  //     );
  //   } else {
  //     goldbetWhileStatus = false;
  //     console.log("The process of scraping GoldBet has finished successfully");
  //     goldbetOdds = goldbetOddsResults;
  //     console.log(goldbetOdds);
  //     /*
  //       Writing a JSON file with the odds of GoldBet, and returning the console.log()
  //       of the error if it is present.
  //     */
  //     // Create the function to write the results
  //     // fs.writeFile("goldbet", goldbetOdds, function (error) {
  //     //   if (err) return console.log(err);
  //     // });
  //   }
  // }

  // Scraping Eurobet
  // let eurobetState = true;
  // while (eurobetState) {
  //   const eurobetOdds = await eurobetScraper(Builder, By, Capabilities, sleep);
  //   if (eurobetOdds.error) {
  //     eurobetState = true;
  //     console.log("Ricomincio il ciclo di Eurobet");
  //   } else {
  //     //console.log(eurobetOdds);
  //     eurobetState = false;
  //     console.log("Ciclo Eurobet finito");
  //   }
  // }

  // Scraping Betaland
  console.log("Starting to scrape Betaland odds.");
  let betalandWhileStatus = true;
  let betalandOdds = [];
  while (betalandWhileStatus) {
    const betalandOddsResult = await betalandScraper(
      chrome,
      Builder,
      By,
      Capabilities,
      betalandLinks,
      sleep
    );
    if (betalandOddsResult.error) {
      betalandWhileStatus = true; /* 
      Implement the console.log() of the specific error
    */
      console.log(
        "I'm restarting the scraping function for Betaland due to some errors"
      );
    } else {
      betalandWhileStatus = false;
      console.log("The process of scraping Betaland has finished successfully");
      betalandOdds = betalandOddsResult;
      /* 
        Writing a JSON file with the odds of GoldBet, and returning the console.log()
        of the error if it is present.
      */
      // Create the function to write the results
      // fs.writeFile("goldbet", goldbetOdds, function (error) {
      //   if (err) return console.log(err);
      // });
    }
  }

  /*
    Here we stop the function that measures and we print the time it tooks for
    the functions to return the results
  */
  const stop = window.performance.now();
  console.log(`Time Taken to execute = ${(stop - start) / 1000} seconds`);
};

mainScraper();
