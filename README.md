# colorful-voice

## install

```
npm install --save colorful-voice
```

## usage

```
var c = require('colorful-voice');

c().yellow('wai').red('wai').reset('wai').blue().add('desho').toConsole();
```

### initialize

initializing with arguments.

```
var s = cv('COLOR');
s.red(' CODE').toConsole();
```

initializing with no arguments.

```
var s = cv();
s.red('wai').toConsole();
```

with array

```
var s = cv(['ne', 'ne', 'ne', 'ne']);
s.cyan('dosuru?').toConsole();
```

like a class method

```
var s = cv.red('sonna').magenta('konnade');
s.green(' COLOR CODE').toConsole();
```

with colorful voice object

```
var s = cv().red('pittanko');
var t = cv(s).add('ha').yellow('doreda?');
t.toConsole();
```

### output

to console

```
cv('wai').toConsole();
```

to string

```
var s = cv.red('wai').toString();
console.log(s);
```

inner object

```
var s = cv.blue('wai').value();

// reuse
var t = cv(s);
t.toConsole();

```

