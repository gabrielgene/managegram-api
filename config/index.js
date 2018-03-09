const config = module.exports = {};

config.app = {};
config.app.port = 8080;

config.mongo = {};
config.mongo.uri = process.env.MONGO_URI;
config.mongo.db = 'managegram';
