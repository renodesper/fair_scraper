const Nightmare = require('nightmare');
const Mailgun = require('mailgun-js');
const moment = require('moment');
const config = require('./config');
const airasia = require('./airasia');

const domain = config.mailgunDomain;
const apiKey = config.mailgunApiKey;
const mailgun = Mailgun({domain: domain, apiKey: apiKey});

const nightmare = Nightmare({ show: false });

// Start AirAsia scraper
const airasiaInput = {
    fromLocation: 'Jakarta',   // Jakarta
    toLocation: 'Singapore',     // Singapore
    fromDate: '01/05/2017',       // 01/05/2017
    toDate: '13/05/2017',         // 13/05/2017
    passenger: '1',      // 1
    recipient: 'reno.esper@gmail.com',      // example@gmail.com (can be comma separated)
    cc: '',             // example@gmail.com
    bcc: ''             // example@gmail.com
};
airasia.scrap(nightmare, mailgun, airasiaInput);
