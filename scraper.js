const Nightmare = require('nightmare');
const Mailgun = require('mailgun-js');
const moment = require('moment');
const config = require('./config');
const airasia = require('./airasia');

const domain = config.mailgunDomain;
const apiKey = config.mailgunApiKey;
const mailgun = Mailgun({domain: domain, apiKey: apiKey});

let nightmare = Nightmare({ show: false });

// Start AirAsia scraper
let airasiaInput = {
    fromLocation: '',   // Jakarta
    toLocation: '',     // Singapore
    fromDate: '',       // 01/05/2017
    toDate: '',         // 13/05/2017
    passenger: '',      // 1
    recipient: '',      // example@gmail.com (can be comma separated)
    cc: '',             // example@gmail.com
    bcc: ''             // example@gmail.com
};
airasia.scrap(nightmare, mailgun, airasiaInput);
