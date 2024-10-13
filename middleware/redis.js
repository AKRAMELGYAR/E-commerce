const redis = require('redis');
const hash = require('object-hash');
let redisClient = undefined;

async function initializeRedisClient() {
    redisClient = redis.createClient({
        socket: {
            host: process.env.r_host,
            port: process.env.r_port
        },
        password: process.env.r_password
    });

    redisClient.connect()
        .then(() => console.log('connected with redis'))
        .catch(err => console.log(err));
}

function isRedisWorking() {
    return !!redisClient?.isOpen;
}

async function writeData(key,ttl, data) {
    if (isRedisWorking()) {
        try {
            await redisClient.setEx(key,ttl,data);
        } catch (e) {
            console.error(`Failed to cache data for key=${key}`, e);
        }
    }
}

async function readData(key) {
    let cachedValue = undefined;
    if (isRedisWorking()) {
        cachedValue = await redisClient.get(key);
        if (cachedValue) {
            return cachedValue;
        }
    }
}

function requestToKey(req) {
    const reqDataToHash = {
        query: req.query,
        body: req.body,
    };
    return `${req.path}@${hash.sha1(reqDataToHash)}`;
}

function redisCacheMiddleware(ttl = process.env.ttl) {
    return async (req, res, next) => {
        if (isRedisWorking()) {
            const key = requestToKey(req);
            const cachedValue = await readData(key);
            if (cachedValue) {
                try {
                    return res.json(JSON.parse(cachedValue));
                } catch {
                    return res.send(cachedValue);
                }
            } else {
                const oldSend = res.send;
                res.send = function (data) {
                    res.send = oldSend;
                    if (res.statusCode.toString().startsWith("2")) {
                        writeData(key,ttl, data).then();
                    }
                    return res.send(data);
                };
                next();
            }
        } else {
            next();
        }
    };
}

module.exports = {
      initializeRedisClient,
      redisCacheMiddleware,
      writeData,
      requestToKey 
    };
