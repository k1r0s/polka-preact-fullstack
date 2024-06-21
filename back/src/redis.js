
/*
* This is just a database wrapper, not an actual production ready implementation.
* Its purpose is just to provide persistance for an application.
*
* Some other adapters to implement crud methods
* https://www.npmjs.com/package/mongodb
* https://www.npmjs.com/package/lowdb
*/

import { createClient } from "redis";
import suid from "short-uuid";

export { create, read, update, remove };

const { DB_URL } = process.env;

let current = null;

const getClient = () => {
  console.log(`Connecting to redis at ${DB_URL} ..`);
  return createClient({ url: DB_URL }).on("error", err => console.log(err)).connect();
}

async function data_set (client, key, data) {
  await client.set(key, JSON.stringify(data));
}

async function data_get (client, key) {
  const data = await client.get(key);
  return JSON.parse(data);
}

async function data_del (client, key) {
  await client.del(key);
}

async function array_add (client, collection, item) {
  await client.RPUSH(collection, item);
}

async function array_clear (client, collection) {
  await client.DEL(collection);
}

async function array_rem (client, collection, item) {
  await client.LREM(collection, 0, item);
}

async function array_get (client, collection, from = 0, to = -1) {
  return await client.LRANGE(collection, from, to);
}

async function create (collection, value) {
  const client = await getClient();
  value.uid = suid.generate();
  await array_add(client, collection, value.uid);
  await data_set(client, [collection, value.uid].join("-"), value);
  await client.disconnect();
  return value;
}

async function update (collection, uid, value) {
  const client = await getClient();
  await data_set(client, [collection, uid].join("-"), value);
  await client.disconnect();
  return value;
}

async function remove (collection, uid) {
  const client = await getClient();
  await data_del(client, [collection, uid].join("-"));
  const items = await array_rem(client, collection, uid);
  await client.disconnect();
}

async function read (collection, uid) {
  const client = await getClient();
  let result;
  if (uid) {
    result = await data_get(client, [collection, uid].join("-"));
  } else {
    result = await array_get(client, collection);
  }
  await client.disconnect();
  return result;
}
