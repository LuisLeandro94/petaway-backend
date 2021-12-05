require('dotenv').config();

module.exports = (app) => {
  const redis = require('promise-redis')();
  const client = redis.createClient(process.env.REDIS_URL);

  const set = async (key, value) => {
    await client.set(key, value);
  };

  const get = async (key) => {
    const result = await client.get(key);
    return result;
  };

  return { set, get };
};
