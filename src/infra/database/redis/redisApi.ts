import { createClient } from 'redis';

const redisUrl = process.env.REDIS_DATABASE_URL;


const redisClient = createClient({
  url: redisUrl
});
redisClient.on('error', err => console.log('Redis Client Error', err));

export default redisClient;