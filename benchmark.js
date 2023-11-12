const GeObjectId = require('./index.js')

const NUMBER_OF_TEST_ITERATION = 1000 * 1000

/**
 * Encode performance
 */
console.time('[DURATION][ENCODE]')
Array.from({ length: NUMBER_OF_TEST_ITERATION }).forEach(() => GeObjectId.encodePoint(41.014399, 28.9855536, 21))
console.timeEnd('[DURATION][ENCODE]')

/**
 * Decode performance
 */
console.time('[DURATION][DECODE]')
Array.from({ length: NUMBER_OF_TEST_ITERATION }).forEach(() => GeObjectId.decodePoint('030ce81b9c04dda6a5e00015'))
console.timeEnd('[DURATION][DECODE]')
