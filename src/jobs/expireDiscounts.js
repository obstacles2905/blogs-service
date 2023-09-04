const {CronJob: Cron} = require("cron");

const expireDiscountsJobs = new Cron('* * * * * *', () => expireDiscounts(),
    null,
    true,
    'Europe/Kiev',
    this,
    true
);

function expireDiscounts() {
    console.log("cron job working");
}

module.exports = {expireDiscountsJobs}
