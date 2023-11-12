# geo-objectid

This package encode geographical coordinates as point or circle into an object id.
Also it is able to decode encoded object id values.

## Installation

```js
npm i --save geo-objectid
```

## Usage

```js
import GeObjectId from 'geo-objectid'

console.log(GeObjectId.encodePoint(41.014399, 28.9855536, 21))
//=> 030ce81b9c04dda6a5e00015

console.log(GeObjectId.decodePoint("030ce81b9c04dda6a5e00015"))
//=> { lat: 41.014399, lon: 28.9855536, rad: 21 }
```

## API

### `encodePoint(lat: number, lon: number, rad: number)`

- returns `string` - a 24 character hex string representing a random ObjectId

### `decodePoint(objectId: string)`

- returns `object` - { lat: number; lon: number; rad: number } 