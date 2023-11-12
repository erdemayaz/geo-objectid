const DECIMAL_BASE = 10;
const HEX_BASE = 16;
const FRACTIONAL_LIMIT = 8;

const FILL_STRING = "0";
const EMPTY_STRING = "";

const LAT_MARGIN = 90;
const LON_MARGIN = 180;

const LAT_PADDING_NUMBER = 10;
const LON_PADDING_NUMBER = 10;
const RAD_PADDING_NUMBER = 4;
const TOTAL_PADDING_NUMBER = 24;

const DEFAULT_RAD = 0;
const MIN_RAD = 0; // minimum hexadecimal value of radius, 0
const MAX_RAD = 65535; // maximum hexadecimal value of radius, FFFF

const MULTIPLIER = Math.pow(DECIMAL_BASE, FRACTIONAL_LIMIT);

const LAT_REGEX = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
const LON_REGEX = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;

function validateLatLon(lat, lon) {
    return typeof lat === 'number' && typeof lon === 'number' && LAT_REGEX.test(lat) && LON_REGEX.test(lon);
}

function validateObjectId(objectId) {
    return typeof objectId === 'string' && OBJECT_ID_REGEX.test(objectId);
}

function normalizeRad(rad) {
    if (typeof rad !== 'number') return DEFAULT_RAD;
    rad = Math.floor(rad);

    if (rad < MIN_RAD) return MIN_RAD;
    if (rad > MAX_RAD) return MAX_RAD;

    return Math.floor(rad);
}

function encodePoint(lat, lon, rad) {
    if (!validateLatLon(lat, lon)) return null;
    rad = normalizeRad(rad);

    const integerLat = parseFloat((lat + LAT_MARGIN).toFixed(FRACTIONAL_LIMIT)) * MULTIPLIER;
    const integerLon = parseFloat((lon + LON_MARGIN).toFixed(FRACTIONAL_LIMIT)) * MULTIPLIER;

    const segments = [
        integerLat.toString(HEX_BASE).padStart(LAT_PADDING_NUMBER, FILL_STRING),
        integerLon.toString(HEX_BASE).padStart(LON_PADDING_NUMBER, FILL_STRING)
    ];

    if (rad) segments.push(rad.toString(HEX_BASE).padStart(RAD_PADDING_NUMBER, FILL_STRING));

    return segments.join(EMPTY_STRING).padEnd(TOTAL_PADDING_NUMBER, FILL_STRING);
}

function decodePoint(objectId) {
    if (!validateObjectId(objectId)) return {};

    const unsignedIntegerLat = Number(`0x${objectId.substring(0, 10)}`);
    const unsignedIntegerLon = Number(`0x${objectId.substring(10, 20)}`);
    const signedIntegerRad = Number(`0x${objectId.substring(20, 24)}`);

    return {
        lat: parseFloat(((unsignedIntegerLat / MULTIPLIER) - LAT_MARGIN).toFixed(FRACTIONAL_LIMIT)),
        lon: parseFloat(((unsignedIntegerLon / MULTIPLIER) - LON_MARGIN).toFixed(FRACTIONAL_LIMIT)),
        rad: signedIntegerRad
    };
}


module.exports = {
    encodePoint,
    decodePoint
};