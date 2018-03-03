const CronJob = require('cron').CronJob;
const amqp = require('amqplib/callback_api');
const task = require('./task');
const dm = require('./dm');

const task_job = new CronJob({
  cronTime: '*/30 * * * *',
  onTick: () => {
    task();
  },
  start: false,
  timeZone: 'America/Sao_Paulo'
});

const dm_job = new CronJob({
  cronTime: '*/40 * * * *',
  onTick: () => {
    dm();
  },
  start: false,
  timeZone: 'America/Sao_Paulo'
});

task_job.start();
dm_job.start();
