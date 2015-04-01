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
  this.value = [];
  if (obj != undefined) {
    this.value = this.value.concat(obj);
  }
}

module.exports = cv = function(obj){
  console.log('new',obj);
  if (obj instanceof cv) return obj;
  if (!(this instanceof cv)) return new cv(obj);

  if (obj == undefined ){
    console.log('new cv as undefined');
    this._wrapped = [new inner()];
  } else if (obj instanceof inner){
    console.log('new cv as inner');
    this._wrapped = [obj];
  } else if (obj.length != undefined && obj[0] instanceof inner){
    console.log('new cv as inners');
    this._wrapped = obj;
  } else {
    console.log('new cv as other');
    this._wrapped = [new inner(obj)];
  }
};

cv.prototype.add = function(obj){
  
  if( obj == undefined){
    console.log('add as undefined');
    return cv(this._wrapped);
  } else if( obj instanceof cv ){
    console.log('add as cv');
    return cv(this._wrapped.concat(obj._wrapped));
  } else if ( obj instanceof inner){
    console.log('add as inner');
    return cv(this._wrapped.concat(obj));
  } else if ( obj.length != undefined && obj[0] instanceof inner){
    console.log('add as inners');
    return cv(this._wrapped.concat(obj));
  } else {
    console.log('add as other');
    return cv(this._wrapped[this._wrapped.length -1].value.concat(obj) );
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

