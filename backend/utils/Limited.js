"use strict";
const REDIS = require("../configs/redis.js");
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
module.exports = {
  incr,
  ttl,
  get,
  set,
  expire,
};
