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
var s = c('COLOR');
s.red(' CODE').toConsole();
```

initializing with no arguments.

```
var s = c();
s.red('wai').toConsole();
```

with array

```
var s = c(['ne', 'ne', 'ne', 'ne']);
s.cyan('dosuru?').toConsole();
```

like a class method

```
var s = c.red('sonna').magenta('konnade');
s.green(' COLOR CODE').toConsole();
```

with colorful voice object

```
var s = c().red('pittanko');
var t = c(s).add('ha').yellow('doreda?');
t.toConsole();
```

### output

to console

```
c('wai').toConsole();
```

to string

```
var s = c.red('wai').toString();
console.log(s);
```

inner object

```
var s = c.blue('wai').value();

// reuse
var t = c(s);
t.toConsole();

```

