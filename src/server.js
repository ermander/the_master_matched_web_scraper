// Selenium library
const { Builder, By, Capabilities } = require("selenium-webdriver");

// Chrome Web Driver
const chrome = require("selenium-webdriver/chrome");

// JSDOM library.
const { JSDOM } = require("jsdom");
const { window } = new JSDOM();

// Google
const { google } = require("googleapis");
const CLIENT_ID =
  "380825532247-ms7fb2sics98gidpja5mkolkoec9feor.apps.googleusercontent.com";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04QKJjcHQKpZZCgYIARAAGAQSNwF-L9IrDUrg8AhKs294_PKGmp-dgxlNJFdlTHPhiquI96hLlxOmfR3371ptoAznCOjlUOabUts";
const CLIENT_SECRET = "NCxvcASUE08q3XKS8ZLx62XA";

// Creating the authentication object
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

// Create an istance of google drive
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

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
const goldbetLinks = require("./GoldBet/Links/goldbetLinks");
const betalandLinks = require("./Betaland/betalandLinks");
const planetwin365Links = require("./Planetwin365/Links/planetwin365Links");
const sisalLinks = require("./Sisal/Links/sisalLinks");
const bwinLinks = require("./Bwin/Links/bwinLinks");
const snaiLinks = require("./Snai/Links/snaiLinks");
const marathonbetLinks = require("./MarathonBet/Links/marathonbetLinks");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const mainScraper = async () => {
  const start = window.performance.now();

  // Printing in the console that the function is starting the web scraping proccess
  console.log("Starting the main scraper function.");

  // GoldBet
  try {
    console.log("Scraping GoldBet");
    const goldbetOdds = await goldbetScraper(
      chrome,
      Builder,
      By,
      Capabilities,
      goldbetLinks,
      sleep
    );
    await drive.files.update({
      fileId: "1QeDD1MosPOkFagOVWttzyiYQ7Y9Imax8",
      media: {
        mimeType: "application/json",
        body: goldbetOdds,
      },
    });
  } catch (error) {
    console.log(error);
  }

  // // Planetwin365
  // console.log("Scraping Planetwin365");
  // await planetwin365Scraper(
  //   chrome,
  //   Builder,
  //   By,
  //   Capabilities,
  //   planetwin365Links,
  //   sleep
  // );
  // // Sisal
  // console.log("Scraping Sisal");
  // await sisalScraper(chrome, Builder, By, Capabilities, sisalLinks, sleep);
  // // Betaland
  // console.log("Scraping Betaland");
  // await betalandScraper(
  //   chrome,
  //   Builder,
  //   By,
  //   Capabilities,
  //   betalandLinks,
  //   sleep
  // );
  // // Eurobet
  // console.log("Scraping Eurobet");
  // await eurobetScraper(Builder, By, Capabilities, sleep);
  // // Bwin
  // console.log("Scraping Bwin");
  // await bwinScraper(chrome, Builder, By, Capabilities, bwinLinks, sleep);

  // // Snai
  // console.log("Scraping Snai");
  // await snaiScraper(chrome, Builder, By, Capabilities, snaiLinks, sleep);

  // // MarathonBet
  // await marathonbetScraper(
  //   chrome,
  //   Builder,
  //   By,
  //   Capabilities,
  //   marathonbetLinks,
  //   sleep
  // );

  /*
    Here we stop the function that measures and we print the time it tooks for
    the functions to return the results
  */
  const stop = window.performance.now();
  console.log(`Time Taken to execute = ${(stop - start) / 1000} seconds`);
};

mainScraper();
