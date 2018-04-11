const config = module.exports = {};

config.app = {};
config.app.port = 8080;

config.mongo = {};
config.mongo.uri = process.env.MONGO_URI || '0.0.0.0';
config.mongo.db = 'managegram';

config.rabbit = {};
config.rabbit.uri = process.env.RABBIT_URL || '0.0.0.0';
