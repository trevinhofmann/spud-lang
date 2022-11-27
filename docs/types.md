# Types

## Booleans
* `boolean`

```spud
boolean fact = true
boolean fiction = false
```

## Integers
* `uint` (equivalent to `uint32`)
* `int` (equivalent to `int32`)
* `uint8`
* `int8`
* `uint16`
* `int16`
* `uint32`
* `int32`
* `uint64`
* `int64`
* `uint128`
* `int128`
* `uin256`
* `int256`

```spud
uint x = 300000
int8 y = -50
```

## Floating point decimals

* TBD if these will be supported.

## Strings
* `string`

```spud
string language = 'Spud'
string empty = ''
string pi = '3.141519'
```

## Ranges
* `range`

```spud
range firstHundred = {1 -> 100}
range evens = {i: 2 -> 100, i = i + 2}
```

## Undefined
* `undefined`