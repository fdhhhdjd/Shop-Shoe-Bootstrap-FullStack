"use strict";
const REDIS = require("../configs/Redis.js");
const incr = (key) => {
  return new Promise((resolve, reject) => {
    REDIS.incr(key, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const ttl = (key) => {
  return new Promise((resolve, reject) => {
    REDIS.ttl(key, (err, ttl) => {
      if (err) return reject(err);
      resolve(ttl);
    });
  });
};

const expire = (key, ttl) => {
  return new Promise((resolve, reject) => {
    REDIS.expire(key, ttl, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const get = async (key) => {
  return new Promise((resolve, reject) => {
    REDIS.get(key, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const set = async (key, count) => {
  return new Promise((resolve, reject) => {
    REDIS.set(key, count, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const del = async (key) => {
  return new Promise((resolve, reject) => {
    REDIS.del(key, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const setnx = async (key, count) => {
  return new Promise((resolve, reject) => {
    REDIS.setnx(key, count, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const decrby = async (key, count) => {
  return new Promise((resolve, reject) => {
    REDIS.decrby(key, count, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const exists = async (key) => {
  return new Promise((resolve, reject) => {
    REDIS.exists(key, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const incrby = async (key, count) => {
  return new Promise((resolve, reject) => {
    REDIS.incrby(key, count, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
//?Delete Event order
const addDelayEventOrder = ({ orderId, delay }) => {
  return new Promise((resolve, reject) => {
    REDIS.set(orderId, "notify-keyspace-events", "EX", delay, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
module.exports = {
  incr,
  ttl,
  get,
  set,
  expire,
  addDelayEventOrder,
  del,
  setnx,
  decrby,
  exists,
  incrby,
};
