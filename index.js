var colors = {
  black:   '\u001b[30m',
  red:     '\u001b[31m',
  green:   '\u001b[32m',
  yellow:  '\u001b[33m',
  blue:    '\u001b[34m',
  magenta: '\u001b[35m',
  cyan:    '\u001b[36m',
  white:   '\u001b[37m',
  reset:   '\u001b[0m' ,
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
