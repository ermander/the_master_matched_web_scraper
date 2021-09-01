// Selenium library
const { Builder, By, Capabilities } = require("selenium-webdriver");
// Chrome Web Driver
const chrome = require("selenium-webdriver/chrome");
// JSDOM library.
// This library is used in this program only for performance testing
// (The only purpose is to "console.log()" the time passed between one function and another)
const { JSDOM } = require("jsdom");
const { window } = new JSDOM();

// Importing all the scraping functions, divided by each bookmaker.
const goldbetScraper = require("./GoldBet/goldbetScraper");
const eurobetScraper = require("./Eurobet/eurobetScraper");
const betalandScraper = require("./Betaland/betalandScraper");
const planetwin365Scraper = require("./Planetwin365/planetwin365Scraper");
const sisalScraper = require("./Sisal/sisalScraper");
const bwinScraper = require("./Bwin/bwinScraper");
const snaiScraper = require("./Snai/snaiScraper");
const marathonbetScraper = require("./MarathonBet/marathonbetScraper");

// Importing all the links to scrape for each function
const goldbetLinks = require("./GoldBet/goldbetLinks");
const betalandLinks = require("./Betaland/betalandLinks");
const planetwin365Links = require("./Planetwin365/Links/planetwin365Links");
const sisalLinks = require("./Sisal/Links/sisalLinks");
const bwinLinks = require("./Bwin/Links/bwinLinks");
const snaiLinks = require("./Snai/Links/snaiLinks");
const marathobetLinks = require("./MarathonBet/Links/marathonbetLinks");
const marathonbetLinks = require("./MarathonBet/Links/marathonbetLinks");

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
  // console.log("Starting to scrape Betaland odds.");
  // let betalandWhileStatus = true;
  // let betalandOdds = [];
  // while (betalandWhileStatus) {
  //   const betalandOddsResult = await betalandScraper(
  //     chrome,
  //     Builder,
  //     By,
  //     Capabilities,
  //     betalandLinks,
  //     sleep
  //   );
  //   if (betalandOddsResult.error) {
  //     betalandWhileStatus = true; /*
  //     Implement the console.log() of the specific error
  //   */
  //     console.log(
  //       "I'm restarting the scraping function for Betaland due to some errors"
  //     );
  //   } else {
  //     betalandWhileStatus = false;
  //     console.log("The process of scraping Betaland has finished successfully");
  //     betalandOdds = betalandOddsResult;
  //   }
  // }

  // Scraping Planetwin365
  // let planetwin365WhileStatus = true;
  // let planetwin365Odds = [];
  // while (planetwin365WhileStatus) {
  //   const planetwin365OddsResult = await planetwin365Scraper(
  //     chrome,
  //     Builder,
  //     By,
  //     Capabilities,
  //     planetwin365Links,
  //     sleep
  //   );
  //   if (planetwin365OddsResult.error) {
  //     betalandWhileStatus = true;
  //     // Implement the console.log() of the specific error
  //     console.log(
  //       "I'm restarting the scraping function for Planetwin365 due to some errors"
  //     );
  //   } else {
  //     planetwin365WhileStatus = false;
  //     console.log(
  //       "The process of scraping Planetwin365 has finished successfully"
  //     );
  //     planetwin365Odds = planetwin365OddsResult;
  //     console.log(planetwin365Odds + "hhhhhhhhhhhhhhhhhhhhhhhhhhhh");
  //   }
  // }

  // Scraping Sisal
  // let sisalWhileStatus = true;
  // let sisalOdds = [];
  // while (sisalWhileStatus) {
  //   try {
  //     const sisalOddsResult = await sisalScraper(
  //       chrome,
  //       Builder,
  //       By,
  //       Capabilities,
  //       sisalLinks,
  //       sleep
  //     );
  //     if (sisalOddsResult.error) {
  //       sisalWhileStatus = true;
  //       // Implement the console.log() of the specific error
  //       console.log(
  //         "I'm restarting the scraping function for Sisal due to some errors"
  //       );
  //     } else {
  //       sisalWhileStatus = false;
  //       console.log("The process of scraping Sisal has finished successfully");
  //       sisalOdds = sisalOddsResult;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // // Scraping Bwin
  // let bwinWhileStatus = true;
  // let bwinOdds = [];
  // while (bwinWhileStatus) {
  //   try {
  //     const bwinOddsResult = await bwinScraper(
  //       chrome,
  //       Builder,
  //       By,
  //       Capabilities,
  //       bwinLinks,
  //       sleep
  //     );
  //     if (bwinOddsResult.error) {
  //       bwinWhileStatus = true;
  //       console.log(
  //         "I'm restarting the scraping function for Bwin due to some errors"
  //       );
  //     } else {
  //       bwinWhileStatus = false;
  //       console.log("he process of scraping Bwin has finished successfully");
  //       bwinOdds = bwinOddsResult;
  //       console.log(bwinOddsResult);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // // Scraping Snai
  // let snaiWhileStatus = true;
  // let snaiOdds = [];
  // while (snaiWhileStatus) {
  //   try {
  //     const snaiOddsResults = await snaiScraper(
  //       chrome,
  //       Builder,
  //       By,
  //       Capabilities,
  //       snaiLinks,
  //       sleep
  //     );
  //     if (snaiOddsResults.error) {
  //       snaiWhileStatus = true;
  //       console.log(
  //         "I'm restarting the scraping function for Snai due to some errors"
  //       );
  //     } else {
  //       snaiWhileStatus = false;
  //       console.log("The process of scraping Snai has finished successfully");
  //       snaiOdds = snaiOddsResults;
  //       //console.log(snaiOddsResults);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  let marathonbetWhileStatus = true;
  let marathonbetOdds = [];
  while (marathonbetWhileStatus) {
    const marathonbetOddsResults = await marathonbetScraper(
      chrome,
      Builder,
      By,
      Capabilities,
      marathonbetLinks,
      sleep
    );
    if (marathonbetOddsResults.error) {
      marathonbetWhileStatus = true;
      console.log(
        "I'm restarting the scraping function for MarathonBet due to some errors"
      );
    } else {
      marathonbetWhileStatus = false;
      console.log(
        "The process of scraping MarathonBet has finished successfully"
      );
      marathonbetOdds = marathonbetOddsResults;
    }
    try {
    } catch (error) {
      console.log(error);
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
