const CronJob = require('cron').CronJob;
const amqp = require('amqplib/callback_api');
const task = require('./task');

const job = new CronJob({
  cronTime: '*/1 * * * *',
  onTick: () => {
    task();
  },
  start: false,
  timeZone: 'America/Sao_Paulo'
});

job.start();
