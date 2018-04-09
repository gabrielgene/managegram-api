const config = module.exports = {};

config.app = {};
config.app.port = 8080;

config.mongo = {};
config.mongo.uri = 'mongo';
config.mongo.db = 'managegram';

config.rabbit = {};
config.rabbit.uri = 'rabbit';
