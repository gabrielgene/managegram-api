const CronJob = require('cron').CronJob;
const amqp = require('amqplib/callback_api');
const task = require('./task');

const job = new CronJob({
  cronTime: '* * * * * *',
  onTick: () => {
    task();
    console.log('job 1 ticked');
  },
  start: false,
  timeZone: 'America/Sao_Paulo'
});

job.start();
