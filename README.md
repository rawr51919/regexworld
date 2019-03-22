
[![Greenkeeper badge](https://badges.greenkeeper.io/coltongit/regexworld.svg)](https://greenkeeper.io/)

with an array
```js
const RegexWorld = require("./test.js");

RegexWorld
  .setStr("this is a this test $$ahah$$ you know it a $$lol$$")
  .setRegex([
    RegexWorld.parse("this", "g"),
    /\$\$(.*?)\$\$/gi
  ])
  .regexStart(null, (err, result) => {
    if(err) console.log(err);
    console.log(result);
  })
```
  
result:
```js
[ [ [ 'this', index: 0 ], [ 'this', index: 10 ] ],
  [ [ '$$ahah$$', 'ahah', index: 20 ],
    [ '$$lol$$', 'lol', index: 43 ] ] ]
```

with an obj
```js
const RegexWorld = require("./test.js");

RegexWorld
  .setStr("this is a this test $$ahah$$ you know it a $$lol$$")
  .setRegex({
    "this": RegexWorld.parse("this", "g"),
    "$$": /\$\$(.*?)\$\$/gi
  })
  .regexStart(null, (err, result) => {
    if(err) console.log(err);
    console.log(result);
  })
```
result:
```js
{ this: [ [ 'this', index: 0 ], [ 'this', index: 10 ] ],
  '$$':
   [ [ '$$ahah$$', 'ahah', index: 20 ],
     [ '$$lol$$', 'lol', index: 43 ] ] }
```

with a simple regex
```js
const RegexWorld = require("./test.js");

RegexWorld
  .setStr("this is a this test $$ahah$$ you know it a $$lol$$")
  .setRegex(/\$\$(.*?)\$\$/gi)
  .regexStart(null, (err, result) => {
    if(err) console.log(err);
    console.log(result);
  })
```
result:
```js
[ [ '$$ahah$$', 'ahah', index: 20 ],
  [ '$$lol$$', 'lol', index: 43 ] ]
  ```
