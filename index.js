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

module.exports = cv = function(obj){
  if (obj instanceof cv) return obj;
  if (!(this instanceof cv)) return new cv(obj);

  if (obj == undefined ){
    this._wrapped = [];
  } else {
    this._wrapped = ([]).concat(obj);
  }
};

cv.prototype.add = function(obj){
  
  if( obj == undefined){
    return cv(this._wrapped);
  } else if( obj instanceof cv ){
    return cv(this._wrapped.concat(obj._wrapped));
  } else {
    return cv(this._wrapped.concat(obj));
  }
};

cv.add = function(obj){
  return new cv(obj);
}

cv.prototype._addColor = function(_color,obj){
  if( obj == undefined){
    return this.add(_color);
  } else {
    return this.add([_color, obj]).reset();
  }
};

var keys = Object.keys(colors);

keys.forEach(function(key){
  var str   = colors[key];
  cv.prototype[key] = function(obj){
    return this._addColor(str, obj);
  };
  cv[key] = function(obj){
    return cv()[key](obj);
  };
});

cv.prototype.value = function() {
  return this._wrapped.concat(colors.reset);
};

cv.prototype.toString = function() {
  return this.value().join('');
};

cv.prototype.toConsole = function(){
  console.log( this.toString() );
}

