const assert = require('node:assert')
const GeObjectId = require('./index.js')

const LAT = 41.014399
const LON = 28.9855536
const RAD = 21

const objectId = GeObjectId.encodePoint(LAT, LON, RAD)

assert.strictEqual(typeof objectId, 'string')
assert.strictEqual(objectId.length, 24)
assert(objectId.match(/^[0-9a-f]{24}$/))

const { lat, lon, rad } = GeObjectId.decodePoint(objectId)

assert.strictEqual(lat, LAT)
assert.strictEqual(lon, LON)
assert.strictEqual(rad, RAD)
