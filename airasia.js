const cheerio = require('cheerio');
const mail = require('./mail');

let parse = (html, mailgun, input) => {
    let $ = cheerio.load(html);

    let leaveFair = $('#availabilityForm > div:nth-child(1) > table > tbody > tr.fare-light-row > td.avail-table-top-border-black.avail-fare.depart.LF > div > div > div:nth-child(2) > div > div > div.avail-fare-price-wrapper > div').text();
    let leaveDepartedTime = $('#availabilityForm > div:nth-child(1) > table > tbody > tr.fare-light-row > td.avail-table-vert.avail-fare-td.avail-table-top-border-black > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(2) > div > div.avail-table-bold').text();
    let leaveArrivalTime = $('#availabilityForm > div:nth-child(1) > table > tbody > tr.fare-light-row > td.avail-table-vert.avail-fare-td.avail-table-top-border-black > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(4) > div > div.avail-table-bold').text();

    let returnFair = $('#availabilityForm > div:nth-child(2) > table > tbody > tr.fare-light-row > td.avail-table-top-border-black.avail-fare.return.LF > div > div > div:nth-child(2) > div > div > div.avail-fare-price-wrapper > div').text();
    let returnDepartedTime = $('#availabilityForm > div:nth-child(2) > table > tbody > tr.fare-light-row > td.avail-table-vert.avail-fare-td.avail-table-top-border-black > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(2) > div > div.avail-table-bold').text();
    let returnArrivalTime = $('#availabilityForm > div:nth-child(2) > table > tbody > tr.fare-light-row > td.avail-table-vert.avail-fare-td.avail-table-top-border-black > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(4) > div > div.avail-table-bold').text();

    input.sender = 'Airport Scraper';
    input.target = 'AirAsia';
    input.fromDate = `${input.fromDate} ${leaveDepartedTime}-${leaveArrivalTime}`;
    input.toDate = `${input.toDate} ${returnDepartedTime}-${returnArrivalTime}`;

    mail.sendReport(mailgun, leaveFair, returnFair, input);
}

let scrap = (nightmare, mailgun, input) => {
    const url = 'http://www.airasia.com/id/en/home.page';
    nightmare.goto(url)
        .wait('#fromInput')
        .type('#fromInput', input.fromLocation).wait(1000)
            .type('#fromInput', '\t').wait(1000)
        .type('#toInput', input.toLocation).wait(1000)
            .type('#toInput', '\t').wait(1000)
        .type('#search_from_date', input.fromDate).wait(1000)
            .type('#search_from_date', '\t').wait(1000)
        .type('#search_to_date', input.toDate).wait(1000)
            .type('#search_to_date', '\t').wait(1000)
        .type('#adtPaxCount', input.passenger).wait(1000)
            .type('#adtPaxCount', '\t').wait(1000)
        .click('#calFair2').wait(1000)
        .click('#searchButton')
        .wait('#undefined-sticky-wrapper > div > div.price-display-header > h4')
        .evaluate(() => {
            return document.documentElement.innerHTML;
        })
        .then((html) => {
            parse(html, mailgun, input);
        })
        .catch(function (error) {
            console.error('ERROR: ', error);
        });
    nightmare.end();
}

module.exports = {
    scrap: scrap
};
