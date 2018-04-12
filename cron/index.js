const CronJob = require('cron').CronJob;
const amqp = require('amqplib/callback_api');
const task = require('./task');
const dm = require('./dm');

const task_job = new CronJob({
  cronTime: '*/3 * * * *',
  onTick: () => {
    task();
  },
  start: false,
  timeZone: 'America/Sao_Paulo'
});

const dm_job = new CronJob({
  cronTime: '*/3 * * * *',
  onTick: () => {
    dm();
  },
  start: false,
  timeZone: 'America/Sao_Paulo'
});

console.log('Start task cron');
task_job.start();

// console.log('Start dm cron');
// dm_job.start();
