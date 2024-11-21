
const pup=require("puppeteer");
let { id, pass } = require("./secret");
let tab;
let dataFile = require("./data");
const data = require("./data");

async function main() {

    let browser = await pup.launch({
        headless: false,
        defaultViewport: false,
        args: ["--start-maximized"],
    });
    function randomDelay(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      } 

    let pages = await browser.pages();
    tab = pages[0];
    await tab.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0');
    await tab.goto("https://internshala.com/");
    await tab.click("button.login-cta",{ delay: randomDelay(100, 100) });
    await tab.type("#modal_email", id,{ delay: randomDelay(100, 100) });
    await tab.type("#modal_password", pass,{ delay: randomDelay(100, 100) });
    await tab.click("#modal_login_submit");
    
    await tab.waitForNavigation({ waitUntil: "networkidle2" });
    await tab.click(".nav-link.dropdown-toggle.profile_container .is_icon_header.ic-24-filled-down-arrow");

    let profile_options = await tab.$$(".profile_options a");
    let app_urls = [];
    for (let i = 0; i < 11; i++) {
        let url = await tab.evaluate(function (ele) {
            return ele.getAttribute("href");
        }, profile_options[i]);
        app_urls.push(url);
    }
    
    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 2000);
    });
    tab.goto("https://internshala.com" + app_urls[3]);
    
    await tab.waitForSelector("#education .ic-16-plus", { visible: true });
    await tab.click("#education .ic-16-plus");

    await tab.waitForSelector("#graduation-tab .ic-16-plus", { visible: true });
    await tab.click("#graduation-tab .ic-16-plus");
    await graduation(dataFile[0]);

   
    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });
    
    tab.goto("https://internshala.com" + app_urls[3]);
    await tab.waitForSelector("#training-resume .ic-16-plus", { visible: true });
    await tab.click("#training-resume .ic-16-plus");
    await training(dataFile[0]);

    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });

    // await tab.waitForSelector(".next-button", { visible: true });
    // await tab.click(".next-button");

    // await tab.waitForSelector(".btn.btn-secondary.skip.skip-button", { visible: true });
    // await tab.click(".btn.btn-secondary.skip.skip-button");

    await tab.waitForSelector("#work-modal .ic-16-plus", { visible: true });
    await tab.click("#work-modal .ic-16-plus");
    await workSample(dataFile[0]);

    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });
     
    await tab.waitForSelector(".resume_download_desktop", {visible : true});
    await tab.click(".resume_download_desktop");                                // if you want to download resume.

    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });
    await application(dataFile[0]);
}

async function graduation(data) {
    
    await tab.waitForSelector("#college", { visible: true });
    await tab.type("#college", data["College"]);

    await tab.waitForSelector("#start_year_chosen", { visible: true });
    await tab.click("#start_year_chosen");
    await tab.waitForSelector(".active-result[data-option-array-index='5']", { visible: true });
    await tab.click(".active-result[data-option-array-index='5']");

    await tab.waitForSelector("#end_year_chosen", { visible: true });
    await tab.click('#end_year_chosen');
    await tab.waitForSelector("#end_year_chosen .active-result[data-option-array-index = '6']", { visible: true });
    await tab.click("#end_year_chosen .active-result[data-option-array-index = '6']");

    await tab.waitForSelector("#degree", { visible: true });
    await tab.type("#degree", data["Degree"]);

    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });
    await tab.waitForSelector("#stream", { visible: true });
    await tab.type("#stream", data["Stream"]);

    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });
    await tab.waitForSelector("#performance-college", { visible: true });
    await tab.type("#performance-college", data["Percentage"]);

    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });

    await tab.click("#college-submit");

}

async function training(data) {

    await tab.waitForSelector("#other_experiences_course", { visible: true });
    await tab.type("#other_experiences_course", data["Training"]);

    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });

    await tab.waitForSelector("#other_experiences_organization", { visible: true });
    await tab.type("#other_experiences_organization", data["Organization"]);

    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });

    await tab.click("#other_experiences_location_type_label");

    await tab.click("#other_experiences_start_date");

    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });

    await tab.waitForSelector(".ui-state-default[href='#']", { visible: true });
    let date = await tab.$$(".ui-state-default[href='#']");
    await date[0].click();
    await tab.click("#other_experiences_is_on_going");

    await tab.waitForSelector("#other_experiences_training_description", { visible: true });
    await tab.type("#other_experiences_training_description", data["description"]);

    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 2000);
    });

    await tab.click("#training-submit");

}

async function workSample(data) {
    await tab.waitForSelector("#to_add_leetcode .ic-24-leetcode", { visible: true });
    await tab.click("#to_add_leetcode .ic-24-leetcode");

    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });

    await tab.waitForSelector("#link", { visible: true });
    await tab.type("#link", data["link"]);

    await tab.waitForSelector("#work-sample-submit", { visible: true });
    await tab.click("#work-sample-submit");
}

async function application(data) {

    await tab.goto("https://internshala.com/the-grand-summer-internship-fair");

    // await tab.waitForSelector(".btn.btn-primary.campaign-btn.view_internship", { visible: true });
    // await tab.click(".btn.btn-primary.campaign-btn.view_internship")

    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 2000);
    });
    await tab.waitForSelector(".job-title-href", { visible: true });
    let details = await tab.$$(".job-title-href");
    let detailUrl = [];
    for (let i = 0; i < 10; i++) {
        let url = await tab.evaluate(function (ele) {
            return ele.getAttribute("href");
        }, details[i]);
        detailUrl.push(url);
    }
    console.log(detailUrl[0]);
    console.log(detailUrl[1]);
    console.log(detailUrl[2]);

    for (let i=3;i<10;i++) {
        await apply(detailUrl[i], data);
        await new Promise(function (resolve, reject) {
            return setTimeout(resolve, 1000);
        });
    }

}

async function apply(url, data) {
    await tab.goto("https://internshala.com" + url);

    await tab.waitForSelector(".btn.btn-large", { visible: true });
    await tab.click(".btn.btn-large");

    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 2000);
    });

    await tab.waitForSelector(".btn.btn-large", { visible: true });
    await tab.click(".btn.btn-large");
    
    await new Promise(function (resolve, reject) {
            return setTimeout(resolve, 20000);
        });
    await tab.click(".submit_button_container");

}

main();
