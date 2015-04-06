var colors = {
  black:   '\u001b[0;30m',
  red:     '\u001b[0;31m',
  green:   '\u001b[0;32m',
  brown:   '\u001b[0;33m',
  blue:    '\u001b[0;34m',
  purple:  '\u001b[0;35m',
  cyan:    '\u001b[0;36m',
  lgray:   '\u001b[0;37m',
  dgray:   '\u001b[1;30m',
  lred:    '\u001b[1;31m',
  lgreen:  '\u001b[1;32m',
  yellow:  '\u001b[1;33m',
  lblue:   '\u001b[1;34m',
  lpurple: '\u001b[1;35m',
  lcyan:   '\u001b[1;36m',
  white:   '\u001b[1;37m',
  reset:   '\u001b[0m' ,
};

var backgrounds = {
  black:  '\u001b[40m',
  red:    '\u001b[41m',
  green:  '\u001b[42m',
  brown:  '\u001b[43m',
  blue:   '\u001b[44m',
  purple: '\u001b[45m',
  cyan:   '\u001b[46m',
  lgray:  '\u001b[47m',
};

var defaultColor = colors.white;

var inner = function(obj){
  if (obj instanceof inner) return obj;
  if (!(this instanceof inner)) return new inner(obj);

  this.color = defaultColor;
  this.values = [];
  if (obj != undefined) {
    this.values = this.values.concat(obj);
  }
}

inner.prototype.copy = function(){
  var color = this.color;
  var values = [].concat(this.values); // not deep
  var i = new inner(values);
  i.color = color;
  return i;
}

var innersCopy = function(wrapped){
  return wrapped.map(function(i){
    return i.copy();
  });
}

var keys = Object.keys(colors);

function colorfulVoiceMaker(_c, _vs, _v){
  var values;
  var _values;
  if( _vs == undefined ){
    _values = [new inner()];
  } else {
    _values = _vs;
  }
  if ( _c != undefined &&
       _values[_values.length-1].values.length === 0 ){
    var _q = innersCopy(_values);
    _q[_q.length-1].color = _c;
    values = _q;
  } else if ( _c != undefined ) {
    var i = new inner();
    i.color = _c;
    values = _values.concat(i);
  } else if ( _v == undefined ){
    values = _values;
  } else if ( typeof _v === 'function' && _v.name === 'colorfulVoice'){
    values = _values.concat(_v.values());
  } else if ( _v.length != undefined && _v[0] instanceof inner ){
    values = _values.concat( innersCopy(_v) );
  } else if ( _v instanceof inner ) {
    values = _values.concat( _v.copy() );
  } else {
    var _q = innersCopy(_values);
    _q[_q.length-1].values = _q[_q.length-1].values.concat(_v);
    values = _q;
  }
  var x = function colorfulVoice(v){
    return colorfulVoiceMaker(null, values, v);
  };
  x.values = function(){
    return values;
  };
  x.toString = function(){
  };
  x.add = function(s){
    return colorfulVoiceMaker(null, values, s);
  };
  var properties={};
  keys.forEach(function(key){
    properties[key] = {
      get: function(){
        return colorfulVoiceMaker(colors[key], values);
      }
    };
  });
  Object.defineProperties(x, properties);
  return x;
}

module.exports = colorfulVoiceMaker();
