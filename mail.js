const moment = require('moment');
const config = require('./config');

const sendReport = (mailgun, leaveFair, returnFair, input) => {
    const scrap_date = moment().format("DD-MM-YYYY, h:mm:ss a");
    const data = {
        from: `${input.sender} <${config.mailgunMail}>`,
        to: input.recipient,
        subject: `Scrap Report: ${input.target}`,
        html: `
            <html>
                <table>
                    <tr>
                        <td><b>Scrap Date</b></td>
                        <td>: ${scrap_date}</td>
                    </tr>
                    <tr>
                        <td><b>From Location</b></td>
                        <td>: ${input.fromLocation}</td>
                    </tr>
                    <tr>
                        <td><b>To Location</b></td>
                        <td>: ${input.toLocation}</td>
                    </tr>
                    <tr>
                        <td><b>From Date & Time</b></td>
                        <td>: ${input.fromDate}</td>
                    </tr>
                    <tr>
                        <td><b>To Date & Time</b></td>
                        <td>: ${input.toDate}</td>
                    </tr>
                    <tr>
                        <td><b>Total Passenger</b></td>
                        <td>: ${input.passenger}</td>
                    </tr>
                    <tr>
                        <td><b>Leave Fair</b></td>
                        <td>: ${leaveFair.trim()} /person</td>
                    </tr>
                    <tr>
                        <td><b>Return Fair</b></td>
                        <td>: ${returnFair.trim()} /person</td>
                    </tr>
                </table>
            </html>
        `
    };

    if (input.cc) {
        data.cc = input.cc;
    }

    if (input.bcc) {
        data.bcc = input.bcc;
    }

    mailgun.messages().send(data, function (error, body) {
        if (error) {
            console.log("Send Error: " + error + "\n");
            return;
        }

        console.log("Scrap Date: \t\t" + scrap_date);
        console.log("From Location: \t\t" + input.fromLocation);
        console.log("To Location: \t\t" + input.toLocation);
        console.log("From Date & Time: \t" + input.fromDate);
        console.log("To Date & Time: \t" + input.toDate);
        console.log("Total Passenger: \t" + input.passenger);
        console.log("Leave Fair: \t\t" + leaveFair.trim() + " /person");
        console.log("Return Fair: \t\t" + returnFair.trim() + " /person\n");
    });
}

module.exports = {
    sendReport: sendReport
};
